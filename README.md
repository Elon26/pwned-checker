# pwned-checker

A mobile application for checking user emails and passwords against known data breaches, as well as securely storing sensitive personal data and managing passwords on the device.

> Commercial project. Published on the App Store under a different name by the client’s request (public link is not available).

---

## 🔐 About the Project

The app allows users to:
- check emails and passwords for exposure in known data breaches;
- securely store sensitive documents, images, videos, and contacts;
- generate strong passwords synced with the system password storage on the device.

The project focuses on user data security and offline access to encrypted local storage.

---

## 🧰 Tech Stack

**Framework / Platform**
- React Native  
- TypeScript  

**State / Storage**
- react-native-mmkv (local storage, no backend)

**API**
- Have I Been Pwned (https://haveibeenpwned.com)

**Infrastructure & Services**
- Firebase Storage
- Firebase Remote Config
- Sentry  
- Apphud  
- Facebook SDK  

**UI / UX**
- Tailwind (NativeWind)  
- react-native-reanimated  
- i18n (localization)

**Tooling**
- ESLint  
- Prettier  

---

## ✨ Key Features

- 🔎 Check emails and passwords against known data breaches  
- 🔐 Secure local vault for:
  - documents  
  - images  
  - videos  
  - contacts  
- 🔑 Password generator synced with the system password manager  
- 💾 Local-first data storage (MMKV, no backend)  
- 🌍 Multi-language support (i18n)  
- 🔍 Input-based filtering across multiple sections  
- 🎞 UI animations (Reanimated)  
- 🛠 Error and crash tracking (Sentry)

---

## 👨‍💻 Role & Responsibilities

The project was implemented entirely by me:
- designed the application architecture from scratch;  
- integrated external API;  
- implemented secure local storage;  
- built UI, animations, and localization;  
- connected analytics and crash reporting;  
- prepared the app for production release.

---

## 🧠 Challenges & Decisions

- The project had to be rebuilt from scratch because the legacy version could not be restored.  
- Spent time working with API documentation to correctly request and parse breach-related data.  
- Designed a local-first architecture for handling sensitive user data without a backend.  
- Properly configured environment variables for multiple third-party services.

---

## 🚀 Local Setup

The project cannot be started without a .env file because it contains confidential keys and tokens (Firebase, Apphud, Facebook, etc.).

Installation and run:

- npm install
- npm run start

---

## 🧪 Code Quality

- ESLint and Prettier configured  
- No tests implemented  
- Multiple environment variables are used for service configuration  

---

## 📌 Notes

This repository is intended to demonstrate architecture, code structure, and development approach.  
The production version is published in the App Store under a different name according to the client’s requirements.
