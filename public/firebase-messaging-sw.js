// 나가볼까 FCM 서비스 워커 : 알림만 (오프라인 캐시 없음)
// 파일 이름 · 위치 고정 (FCM 기본값) · 서비스 워커는 import.meta.env 를 못 읽어서 설정값을 직접 적음 (웹 설정값은 공개돼도 되는 값)
importScripts("https://www.gstatic.com/firebasejs/13.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/13.4.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAuy7T0HbbDzvaD3Yah7u7rSoN9r-epU8U",
  authDomain: "nagabolkka-4642f.firebaseapp.com",
  projectId: "nagabolkka-4642f",
  messagingSenderId: "511444745983",
  appId: "1:511444745983:web:55ced01a34aa1cce2616ca",
});

// 백그라운드 (탭이 닫혔거나 뒤에 있을 때) : 서버가 webpush.notification 으로 보내서 FCM 이 알림을 자동으로 띄우고, 누르면 link 를 엶
firebase.messaging();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

// 화면이 앞에 있을 때 앱이 직접 띄운 알림 (utils/push.js listenForegroundPush) 을 눌렀을 때만 처리
self.addEventListener("notificationclick", (event) => {
  const url = event.notification.data?.url;
  if (!url) return; // FCM 이 띄운 알림은 FCM 이 처리
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const opened = clients.find((c) => new URL(c.url).origin === self.location.origin);
      if (opened) {
        opened.navigate(url);
        return opened.focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});