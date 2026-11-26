import { useCallback, useEffect, useRef, useState } from "react";
import { startQuestCall } from "../api/quests";

const REALTIME_CALLS_URL = "https://api.openai.com/v1/realtime/calls";
const MAX_LINES = 6;

// 루미 동행 통화 : 브라우저 ↔ OpenAI Realtime 을 WebRTC 로 직접 연결 (음성은 우리 서버를 안 거침)
// status : idle 대기 · connecting 연결 중 · live 통화 중 · ended 끝 · error 실패
export default function useLumiCall() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null); // MIC_DENIED · CALL_UNAVAILABLE · QUEST_ALREADY_DONE · NETWORK
  const [lines, setLines] = useState([]); // { who: "lumi" | "me", text }
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [maxSeconds, setMaxSeconds] = useState(600);
  const ref = useRef({}); // pc · dc · mic · audio · wakeLock · timer

  const cleanup = useCallback(() => {
    const r = ref.current;
    clearInterval(r.timer);
    r.dc?.close();
    r.pc?.getSenders().forEach((sender) => sender.track?.stop());
    r.pc?.close();
    r.mic?.getTracks().forEach((track) => track.stop());
    if (r.audio) r.audio.srcObject = null;
    r.wakeLock?.release().catch(() => {});
    ref.current = {};
    setSpeaking(false);
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setStatus((s) => (s === "error" ? s : "ended"));
  }, [cleanup]);

  // 서버 이벤트 : 루미 말 자막 · 내 말 자막 · 말하는 중
  const handleEvent = useCallback((event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }
    const addLine = (who, text) => {
      const clean = text?.trim();
      if (clean) setLines((prev) => [...prev, { who, text: clean }].slice(-MAX_LINES));
    };
    switch (data.type) {
      case "response.output_audio_transcript.done":
        addLine("lumi", data.transcript);
        break;
      case "conversation.item.input_audio_transcription.completed":
        addLine("me", data.transcript);
        break;
      case "output_audio_buffer.started":
        setSpeaking(true);
        break;
      case "output_audio_buffer.stopped":
      case "output_audio_buffer.cleared":
        setSpeaking(false);
        break;
      default:
    }
  }, []);

  // 버튼을 눌렀을 때 시작 (아이폰은 사용자 동작 안에서 마이크 · 소리를 열어야 함)
  const start = useCallback(async () => {
    if (ref.current.pc) return;
    setStatus("connecting");
    setError(null);
    setLines([]);
    setSeconds(0);

    // 소리 재생 요소는 탭한 순간에 만들어 둠 (자동 재생 막힘 방지)
    const audio = new Audio();
    audio.autoplay = true;
    ref.current.audio = audio;

    let mic;
    try {
      mic = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch {
      cleanup();
      setError("MIC_DENIED");
      setStatus("error");
      return;
    }
    ref.current.mic = mic;

    try {
      const call = await startQuestCall();
      setMaxSeconds(call.maxSeconds ?? 600);

      const pc = new RTCPeerConnection();
      ref.current.pc = pc;
      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
        audio.play().catch(() => {});
      };
      pc.onconnectionstatechange = () => {
        if (["failed", "disconnected"].includes(pc.connectionState)) {
          cleanup();
          setError("NETWORK");
          setStatus("error");
        }
      };
      mic.getTracks().forEach((track) => pc.addTrack(track, mic));

      const dc = pc.createDataChannel("oai-events");
      ref.current.dc = dc;
      dc.onmessage = handleEvent;
      // 연결되면 루미가 먼저 말 걸기
      dc.onopen = () => dc.send(JSON.stringify({ type: "response.create" }));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const res = await fetch(REALTIME_CALLS_URL, {
        method: "POST",
        body: offer.sdp,
        headers: { Authorization: `Bearer ${call.clientSecret}`, "Content-Type": "application/sdp" },
      });
      if (!res.ok) throw new Error(`realtime ${res.status}`);
      await pc.setRemoteDescription({ type: "answer", sdp: await res.text() });

      // 통화 중 화면 꺼짐 방지 (지원하는 브라우저만)
      ref.current.wakeLock = await navigator.wakeLock?.request("screen").catch(() => null);

      const startedAt = Date.now();
      const limit = call.maxSeconds ?? 600;
      ref.current.timer = setInterval(() => {
        const passed = Math.floor((Date.now() - startedAt) / 1000);
        setSeconds(passed);
        if (passed >= limit) {
          cleanup();
          setStatus("ended");
        }
      }, 1000);
      setStatus("live");
    } catch (e) {
      cleanup();
      setError(e.response?.data?.code ?? "NETWORK");
      setStatus("error");
    }
  }, [cleanup, handleEvent]);

  const toggleMute = () => {
    const next = !muted;
    ref.current.mic?.getAudioTracks().forEach((track) => {
      track.enabled = !next;
    });
    setMuted(next);
  };

  useEffect(() => cleanup, [cleanup]); // 화면을 떠나면 통화 종료

  return { status, error, lines, speaking, muted, seconds, maxSeconds, start, stop, toggleMute };
}