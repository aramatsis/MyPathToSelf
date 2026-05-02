// js/auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrYTRsm0-T_6r8yQjJ6cNgziNCYNdbtlM",
  authDomain: "mypathtoself-43707.firebaseapp.com",
  projectId: "mypathtoself-43707",
  storageBucket: "mypathtoself-43707.firebasestorage.app",
  messagingSenderId: "906263821421",
  appId: "1:906263821421:web:11c829be72e1ad3ddf9364",
};

// Инициализация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === Функция входа ===
export function loginUser() {
  const email = document.getElementById('email')?.value.trim().toLowerCase();
  const password = document.getElementById('password')?.value;
  const messageBox = document.getElementById('message');

  if (!messageBox) return;

  messageBox.textContent = '';
  messageBox.className = 'message';

  if (!email || !password) {
    messageBox.textContent = "Введите email и пароль.";
    messageBox.classList.add('error');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      messageBox.textContent = "Вход успешен! Перенаправление...";
      messageBox.classList.add('success');
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    })
    .catch((error) => {
      let msg = error.message;

      if (msg.includes('user-not-found') || msg.includes('wrong-password')) {
        msg = 'Неверный email или пароль.';
      } else if (msg.includes('invalid-email')) {
        msg = 'Некорректный email.';
      } else {
        msg = 'Ошибка: ' + msg;
      }

      messageBox.textContent = msg;
      messageBox.classList.add('error');
    });
}

// === Обновление ссылки в шапке (устойчиво к оффлайн) ===
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Даже если Firestore недоступен — показываем "Мой профиль"
      authLink.innerHTML = '<a href="profile.html">Мой профиль</a>';
    } else {
      authLink.innerHTML = '<a href="login.html">Авторизация</a>';
    }
  });
}

// === Защита страницы ===
export function requireAuth(redirectUrl = 'login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectUrl;
    }
  });
}

  // === Функция для загрузки профиля ===
export function loadProfile() {
  const user = getAuth().currentUser;
  const messageBox = document.getElementById('message');

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Показываем email
  const emailEl = document.getElementById('user-email');
  if (emailEl) emailEl.textContent = user.email;

  // Загружаем имя и телефон из Firestore
  getDoc(doc(db, "users", user.uid))
    .then((userDoc) => {
      if (userDoc.exists()) {
        const data = userDoc.data();
        const nameEl = document.getElementById('user-name');
        const phoneEl = document.getElementById('user-phone');

        if (nameEl) nameEl.textContent = data.name || '—';
        if (phoneEl) phoneEl.textContent = data.phone || '—';
      } else {
        console.warn("Документ пользователя не найден в Firestore");
      }
    })
    .catch((error) => {
      console.error("Ошибка при загрузке профиля:", error);
      if (messageBox) {
        messageBox.textContent = "Не удалось загрузить данные.";
        messageBox.className = "message error";
      }
    });
}

// === Функция выхода ===
export function logout() {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Ошибка выхода:", error);
      const messageBox = document.getElementById('message');
      if (messageBox) {
        messageBox.textContent = "Ошибка выхода.";
        messageBox.className = "message error";
      }
    });
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Если есть кнопка входа — вешаем обработчик
  const loginBtn = document.querySelector('button[onclick="loginUser()"]');
  if (loginBtn) {
    loginBtn.onclick = loginUser;
  }

  // Обновляем шапку (если элемент есть)
  updateAuthLink();
});// js/auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBs9_jRCd1elmS5w_0VF6XqisMRc9te5dg",
  authDomain: "backtoyourself-eb8e5.firebaseapp.com",
  projectId: "backtoyourself-eb8e5",
  storageBucket: "backtoyourself-eb8e5.firebasestorage.app",
  messagingSenderId: "852375930545",
  appId: "1:852375930545:web:a02c8925c7e210ebdb0490",
  measurementId: "G-6LTP00LDY3"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === Функция входа ===
export function loginUser() {
  const email = document.getElementById('email')?.value.trim().toLowerCase();
  const password = document.getElementById('password')?.value;
  const messageBox = document.getElementById('message');

  if (!messageBox) return;

  messageBox.textContent = '';
  messageBox.className = 'message';

  if (!email || !password) {
    messageBox.textContent = "Введите email и пароль.";
    messageBox.classList.add('error');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      messageBox.textContent = "Вход успешен! Перенаправление...";
      messageBox.classList.add('success');
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    })
    .catch((error) => {
      let msg = error.message;

      if (msg.includes('user-not-found') || msg.includes('wrong-password')) {
        msg = 'Неверный email или пароль.';
      } else if (msg.includes('invalid-email')) {
        msg = 'Некорректный email.';
      } else {
        msg = 'Ошибка: ' + msg;
      }

      messageBox.textContent = msg;
      messageBox.classList.add('error');
    });
}

// === Обновление ссылки в шапке (устойчиво к оффлайн) ===
function updateAuthLink() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Даже если Firestore недоступен — показываем "Мой профиль"
      authLink.innerHTML = '<a href="profile.html">Мой профиль</a>';
    } else {
      authLink.innerHTML = '<a href="login.html">Авторизация</a>';
    }
  });
}

// === Защита страницы ===
export function requireAuth(redirectUrl = 'login.html') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectUrl;
    }
  });
}

  // === Функция для загрузки профиля ===
export function loadProfile() {
  const user = getAuth().currentUser;
  const messageBox = document.getElementById('message');

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Показываем email
  const emailEl = document.getElementById('user-email');
  if (emailEl) emailEl.textContent = user.email;

  // Загружаем имя и телефон из Firestore
  getDoc(doc(db, "users", user.uid))
    .then((userDoc) => {
      if (userDoc.exists()) {
        const data = userDoc.data();
        const nameEl = document.getElementById('user-name');
        const phoneEl = document.getElementById('user-phone');

        if (nameEl) nameEl.textContent = data.name || '—';
        if (phoneEl) phoneEl.textContent = data.phone || '—';
      } else {
        console.warn("Документ пользователя не найден в Firestore");
      }
    })
    .catch((error) => {
      console.error("Ошибка при загрузке профиля:", error);
      if (messageBox) {
        messageBox.textContent = "Не удалось загрузить данные.";
        messageBox.className = "message error";
      }
    });
}

// === Функция выхода ===
export function logout() {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Ошибка выхода:", error);
      const messageBox = document.getElementById('message');
      if (messageBox) {
        messageBox.textContent = "Ошибка выхода.";
        messageBox.className = "message error";
      }
    });
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Если есть кнопка входа — вешаем обработчик
  const loginBtn = document.querySelector('button[onclick="loginUser()"]');
  if (loginBtn) {
    loginBtn.onclick = loginUser;
  }

  // Обновляем шапку (если элемент есть)
  updateAuthLink();
});