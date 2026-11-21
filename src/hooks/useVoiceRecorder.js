import { useCallback, useEffect, useRef, useState } from "react";
import { VOICE_MAX_SECONDS, VOICE_MIN_MS } from "../constants/practice";

// 브라우저마다 되는 녹음 형식이 다름 (아이폰 사파리 = mp4 · 크롬 = webm) → 되는 것부터
const MIME_TYPES = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"];

export const isVoiceSupported = () =>
  typeof window !== "undefined" &&
  !!navigator.mediaDevices?.getUserMedia &&
  typeof window.MediaRecorder !== "undefined";

const pickMimeType = () =>
  MIME_TYPES.find((type) => window.MediaRecorder.isTypeSupported?.(type)) ?? "";

// 녹음 : start() (버튼 누를 때만 · 권한 창) → stop() 이 Blob 을 돌려줌 (너무 짧으면 null)
// 30초가 되면 자동으로 멈추고 start(onAutoStop) 의 onAutoStop(blob) 을 부름
export default function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const startedAtRef = useRef(0);
  const resolveRef = useRef(null);

  // 마이크 끄기 (주소창 · 상단의 마이크 표시도 사라짐)
  const release = useCallback(() => {
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setRecording(false);
    setSeconds(0);
  }, []);

  const stop = useCallback(
    () =>
      new Promise((resolve) => {
        const recorder = recorderRef.current;
        if (!recorder || recorder.state === "inactive") {
          resolve(null);
          return;
        }
        resolveRef.current = resolve;
        recorder.stop();
      }),
    [],
  );

  // 권한 거부면 throw (e.name === "NotAllowedError")
  const start = useCallback(
    async (onAutoStop) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const tooShort = Date.now() - startedAtRef.current < VOICE_MIN_MS;
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || mimeType || "audio/webm",
        });
        release();
        const result = tooShort || blob.size === 0 ? null : blob;
        if (resolveRef.current) {
          resolveRef.current(result); // 사용자가 ■ 를 누름
          resolveRef.current = null;
        } else {
          onAutoStop?.(result); // 30초 자동 멈춤
        }
      };

      streamRef.current = stream;
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();
      recorder.start();
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);
        setSeconds(elapsed);
        if (elapsed >= VOICE_MAX_SECONDS && recorder.state === "recording") recorder.stop();
      }, 250);
    },
    [release],
  );

  // 화면을 떠나면 녹음 · 마이크 정리 (결과는 버림)
  useEffect(
    () => () => {
      resolveRef.current = null;
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    },
    [],
  );

  return { recording, seconds, start, stop };
}