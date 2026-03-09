# Instagram Clone

A dark mode Instagram login and signup clone built with React and Express, styled completely with pure, functional **Vanilla CSS**.

## Tech Stack
* **Frontend:** React, Vanilla CSS, Motion (Animations)
* **Backend:** Node.js, Express, Vite
* **Language:** TypeScript

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (this will start both the Express backend and Vite frontend):
   ```bash
   npm run dev
   ```

3. Open the application in your browser:
   `http://localhost:3000`

## Available Scripts

* `npm run dev` - Starts the development server using `tsx`.
* `npm run build` - Builds the application for production using Vite.
* `npm run preview` - Locally previews the production build.
* `npm run lint` - Runs TypeScript type checking.
* `npm run clean` - Removes the `dist` build output directory.

## Features
* **No TailwindCSS**: Completely recreated using semantic, classic Vanilla CSS class names targeting standard DOM APIs.
* Smooth page transitions between Login and Signup using `motion/react`
* Responsive UI mirroring the real Instagram mobile and web forms
* A mock Instagram feed integrated with navigation layouts and standard actions.
* Dummy backend API to simulate auth behaviors.
