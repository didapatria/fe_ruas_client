# Ruas (Ruang Pengawas) Ujian - Client

Welcome to our cutting-edge React application, built using the latest technologies! This repository showcases the use of React JS for creating fast and responsive user interfaces, Tailwind CSS for styling, and Tensorflow JS for incorporating powerful machine learning capabilities. With this powerful combination, we aim to deliver a seamless and delightful experience for our users. Whether you're interested in exploring the codebase, contributing to the project, or just seeing what's possible with these technologies, we invite you to dive in and take a look!

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#installation-and-setup-instructions">Installation and Setup Instructions</a>
      <ul>
        <li><a href="#create-a-new-react-project-with-yarn">Create a new react project with yarn</a></li>
        <li><a href="#install-react-dependencies-and-tensorflow">Install React Dependencies and TensorFlow</a></li>
        <li><a href="#install-tailwind-css-with-prettier-plugin">Install Tailwind CSS with Prettier plugin</a></li>
        <li><a href="#add-tailwind-to-your-postcss-configuration">Add Tailwind to your PostCSS configuration</a></li>
        <li><a href="#configure-your-template-paths">Configure your template paths</a></li>
        <li><a href="#add-the-tailwind-directives-to-your-css">Add the Tailwind directives to your CSS</a></li>
        <li><a href="#start-your-build-process">Start your build process</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- INSTALLATION AND SETUP INSTRUCTIONS -->

## Installation and Setup Instructions

### Create a new react project with yarn

Start by creating a new React project with [\***\*Create React App v5.0+\*\***](https://create-react-app.dev/docs/getting-started/) if you don't have one already set up.

```
yarn create react-app fe_ruas_client
cd fe_ruas_client
```

### Install React Dependencies and TensorFlow

Install react dependencies and tensorflow with yarn

```
yarn add react-redux @reduxjs/toolkit react-router-dom react-webcam axios formik yup http-proxy-middleware @tensorflow/tfjs @tensorflow-models/blazeface
```

### Install Tailwind CSS with Prettier plugin

Install `tailwindcss` with yarn, and then run the init command to generate your `tailwind.config.js` file.

```
yarn add -D tailwindcss prettier prettier-plugin-tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

### Add Tailwind to your PostCSS configuration

Add `tailwindcss` and `autoprefixer` to your `postcss.config.js` file, or wherever PostCSS is configured in your project.

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### Configure your template paths

Add the paths to all of your template files in your `tailwind.config.js` file.

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Start your build process

Run your build process with `yarn start`.

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
