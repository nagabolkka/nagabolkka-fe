import { deleteToken, getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { firebaseApp } from "../firebase";
import { deleteFcmToken, saveFcmToken } from "../api/push";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
const TOKEN_KEY = "nagabolkka:fcmToken"; // 이 기기에서 서버에 등록한 토큰

const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent);
const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;

let messagingPromise = null;
const getMessagingSafe = () => {
  messagingPromise ??= isSupported().then((ok) => (ok ? getMessaging(firebaseApp) : null));
  return messagingPromise;
};

// 서비스 워커 등록 → 활성화까지 기다림 (참고 글의 "no active Service Worker" 방지)
async function getSwRegistration() {
  await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  return navigator.serviceWorker.ready;
}

async function fetchToken(messaging) {
  return getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: await getSwRegistration() });
}

// "unsupported" | "needs-install" (아이폰 브라우저) | "denied" | "on" | "off"
export async function getPushState() {
  if (isIos() && !isStandalone()) return "needs-install";
  if (!("serviceWorker" in navigator) || !VAPID_KEY || !(await getMessagingSafe())) return "unsupported";
  if (Notification.permission === "denied") return "denied";
  return Notification.permission === "granted" && localStorage.getItem(TOKEN_KEY) ? "on" : "off";
}

// 버튼을 눌렀을 때만 부르기 (권한 창은 사용자 동작으로만 — 아니면 iOS 에서 바로 거부)
export async function enablePush() {
  const messaging = await getMessagingSafe();
  if (!messaging) return false;
  if ((await Notification.requestPermission()) !== "granted") return false;
  const token = await fetchToken(messaging);
  await saveFcmToken(token);
  localStorage.setItem(TOKEN_KEY, token);
  return true;
}

export async function disablePush() {
  const token = localStorage.getItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  if (token) await deleteFcmToken(token).catch(() => {}); // 서버 실패해도 기기는 끔
  const messaging = await getMessagingSafe();
  if (messaging) await deleteToken(messaging).catch(() => {});
}

// 탈퇴 후 : 서버 토큰은 탈퇴 때 같이 지워짐 (CASCADE) → 기기 쪽만 정리 (서버 호출 X)
export async function clearPushOnDevice() {
  localStorage.removeItem(TOKEN_KEY);
  const messaging = await getMessagingSafe();
  if (messaging) await deleteToken(messaging).catch(() => {});
}

// 앱을 열 때마다 : 서버에 다시 등록 (토큰이 같아도 · 서버 DB 복구 · 로컬 H2 재시작으로 지워져도 되살아나게)
// 같은 토큰이면 서버가 덮어쓰기만 함 · 토큰이 바뀌었으면 새 토큰으로 교체
export async function refreshPushToken() {
  const saved = localStorage.getItem(TOKEN_KEY);
  if (!saved) return;
  if (Notification.permission !== "granted") {
    await disablePush(); // 사용자가 브라우저 설정에서 알림을 끔
    return;
  }
  const messaging = await getMessagingSafe();
  if (!messaging) return;
  const token = await fetchToken(messaging);
  await saveFcmToken(token); // 바뀌었을 때만 → 항상
  localStorage.setItem(TOKEN_KEY, token);
}

// 화면이 앞에 있을 때 : FCM 이 자동으로 안 띄우니 서비스 워커로 같은 알림 띄우기
export async function listenForegroundPush() {
  const messaging = await getMessagingSafe();
  if (!messaging) return;
  onMessage(messaging, async ({ notification, fcmOptions }) => {
    const registration = await getSwRegistration();
    registration.showNotification(notification?.title ?? "나가볼까", {
      body: notification?.body ?? "",
      icon: "/icon-192.png",
      badge: "/favicon.png",
      data: { url: fcmOptions?.link ?? "/home" },
    });
  });
}