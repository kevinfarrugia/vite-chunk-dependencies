import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

const isBundleMatchFramework = (id) =>
  new RegExp(
    `(?<!node_modules.*)[\\\\/]node_modules[\\\\/](${[
      "react",
      "react-dom",
      "scheduler",
      "prop-types",
      "react-redux",
    ].join("|")})[\\\\/]`
  ).test(id);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create a separate chunk for React framework dependencies
          if (isBundleMatchFramework(id)) {
            return "framework";
          }

          // Create separate chunks for React components
          if (id.includes('/components/') && id.endsWith('index.jsx')) {
            // Extract component name from path (e.g., "TodoList" from "/components/TodoList/index.jsx")
            const match = /\/components\/([^/]+)\/index\.jsx$/.exec(id);
            if (match) {
              return `${match[1]}`;
            }
          }

          // Create separate chunk for the App component
          if (id.includes('/src/App.jsx')) {
            return 'app';
          }

          return null;
        },
      },
    },
  },
});
