# Universal App

A cross-platform mobile and web application built with **Expo**, **React Native**, and **NativeWind**. Designed with a scalable, feature-driven architecture to share business logic and styling seamlessly across iOS, Android, and the Web.

## Tech Stack

* **Framework:** [Expo](https://expo.dev) & [React Native](https://reactnative.dev)
* **Routing:** [Expo Router](https://expo.dev) (File-based universal navigation)
* **Styling:** [NativeWind](https://nativewind.dev) (Tailwind CSS for React Native)
* **Language:** TypeScript (Strict mode enabled with `@/*` path aliases)

## Project Architecture

This codebase follows a **Feature-Driven Architecture** inside `src/` to keep navigation decoupled from domain logic and reusable primitives:

```text
src/
├── app/                  # Expo Router routes & layouts (thin screen wrappers)
├── features/             # Self-contained domain modules (e.g., auth, profile)
│   └── <feature>/
│       ├── components/   # Feature-specific UI components
│       ├── hooks/        # Feature-specific state & queries
│       ├── screens/      # Full screen views imported by src/app/
│       └── api.ts        # Feature API & data layer
└── shared/               # Global, cross-feature infrastructure
    ├── components/       # Reusable UI primitives (Buttons, Inputs, Layouts)
    ├── config/           # App constants, environment variables, theme tokens
    ├── hooks/            # Global custom hooks
    ├── lib/              # Third-party client initialisations
    └── types/            # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) (LTS recommended)
* [Expo Go](https://expo.devgo) on your iOS or Android device (for physical device testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com
   cd universal-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the universal development server:
   ```bash
   npx expo start --clear
   ```

### Running on Platforms

Once the Expo development server is running in your terminal:

* **Web:** Press `w` to open in your default browser (`http://localhost:8081`).
* **Android:** Press `a` to launch in an Android Emulator, or scan the QR code with Expo Go.
* **iOS:** Press `i` to launch in an iOS Simulator (macOS), or scan the QR code with your iPhone camera.

## Git Workflow

* **`main`**: Protected baseline containing tested, production-ready code.
* **`feat/<feature-name>`**: Feature branches created off `main` for isolated development before merging.
