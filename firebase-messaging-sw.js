// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Inicialize o Firebase com suas credenciais
firebase.initializeApp({
  apiKey: "AIzaSyBMr3KcqWq358YvERVBkSqzDsqHnqsBqCw",
  authDomain: "chat-publico-foundation.firebaseapp.com",
  databaseURL: "https://chat-publico-foundation-default-rtdb.firebaseio.com",
  projectId: "chat-publico-foundation",
  storageBucket: "chat-publico-foundation.appspot.com",
  messagingSenderId: "1028294779813",
  appId: "1:1028294779813:web:a5fbdc8f5a7bb6c91abe4c"
});

// Recupera instância do Messaging
const messaging = firebase.messaging();

// Captura mensagens quando o app está em background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em background:', payload);

  const notificationTitle = payload.notification?.title || 'Nova Mensagem';
  const notificationOptions = {
    body: payload.notification?.body || 'Você recebeu uma nova mensagem',
    icon: '/assets/icon.png' // substitua pelo caminho do seu ícone
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opcional: clique na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // abre a raiz do site
  );
});
