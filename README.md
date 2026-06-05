# TMDB Kinopoisk Application

**Welcome to TMDB Kinopoisk Application!**

This is a Single Page Application built on **TMDB - The Movie Database API**, a free RESTful web service that provides comprehensive movie, TV show, and cast data, including metadata, images, ratings, and streaming information, for use in applications and websites.

This is the final test assignment for [it-incubator Front-end React JS (TypeScript) course](https://it-incubator.io/education/front-end).

### Key Pages:

*   Main Page 🏠
*   Category Movies Page 📋
    *   Popular movies
    *   Top-rated movies
    *   Upcoming movies
    *   Now playing movies
*   Detailed Movie Page 🎬
*   Filtered Movies Page ⬇️⬆️ 
*   Search Movies Page 🔍
*   Favorite Movies Page ❤️


## Technology Stack 💻📚

*   React
*   Redux Toolkit
*   RTK Query
*   TypeScript
*   React Router DOM
*   React Hook Form
*   Zod validation
*   Material UI
*   React Toastify
*   Emotion / styled-components
*   Vite
*   ESLint
*   Prettier
*   Commitlint
*   Stylelint
*   Husky
*   lint-staged
*   SVGR
*   Lottie

## Assignment requirements and self-assessment ✔️

*   [Assignment requirements](./requirements.md)
*   [Self-assessment](https://github.com/Intrstng/TMDB-kinopoisk/pull/1/)

## Deploy 🌐

*   [Deploy link](https://tmdb-cinemascope.vercel.app/)

## Getting Started 🚀

Follow these steps to run the application locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Intrstng/TMDB-kinopoisk.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd TMDB-kinopoisk
    ```

3.  **Switch to the `develop` branch:**

    ```bash
    git checkout develop
    ```

4.  **Install dependencies:**

    ```bash
    pnpm install
    ```

    If you have problems with running the script, use the following command in the CLI:

    ```bash
    pnpm install --legacy-peer-deps
    ```

5.  **Configure environment variables:**

    *   Create a `.env` file in the root directory based on the `.env.local` file.
    *   Register for an API key [TMDB API](https://developer.themoviedb.org/docs/getting-started) and fill in the required credentials in the `.env` file.

6.  **Start the development server:**

    ```bash
    pnpm run dev
    ```

7.  **Access the application:**

    *   Open your browser and navigate to the link provided in the CLI.

## Available Scripts ⚙️

*   **`build`:** 📦 Builds the application for production.

    ```bash
    pnpm run build
    ```

*   **`dev`:** 💻 Starts the Vite development server.

    ```bash
    pnpm run dev
    ```

*   **`preview`:** 🚀 Locally serves your production build (dist folder) to test how the app will behave before deploying it to a live server.

    ```bash
    npm run preview
    ```
*   **`lint:check`:** 🔍 Runs ESLint to check for code quality issues.

      ```bash
      pnpm run lint:check
      ```

*   **`lint:fix`:** 🐛 Automatically fixes ESLint errors.

    ```bash
    pnpm run lint:fix
    ```

*   **`format:check`:** ✅ Checks code formatting with Prettier.

    ```bash
    npm run format:check
    ```

*   **`format:fix`:** ✨ Automatically formats code with Prettier.

    ```bash
    npm run format:fix
    ```

*   **`stylelint:check`:** 🎨 Checks CSS files for stylelint errors.

    ```bash
    npm run stylelint:check
    ```

*   **`stylelint:fix`:** 🔧 Automatically fixes CSS stylelint errors.

    ```bash
    npm run stylelint:fix
    ```

*   **`type:check`:** ⌨️ Performs a TypeScript type check without emitting any output files.

    ```bash
    npm run type:check
    ```

*   **`prepare`:** ⚙️A lifecycle script that Husky uses to set up Git hooks. This is automatically run after `npm install`.

    ```bash
    npm run prepare
    ```

*   **Commit-msg Hooks (Husky):** 📝 Commitlint is triggered by Git after a *user* has entered a *commit message* but before the commit is actually created.

*   **Pre-commit Hooks (Husky):** 🔒 ESLint, Stylelint and Prettier are automatically run during `git commit` operations.