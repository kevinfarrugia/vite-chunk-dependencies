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
        manualChunks: (id, { getModuleInfo }) => {
          // Create a separate chunk for React framework dependencies
          if (isBundleMatchFramework(id)) {
            return "framework";
          }

          // Create separate chunks for React components
          if (id.includes('/components/') && id.endsWith('index.jsx')) {
            // Extract component name from path (e.g., "TodoList" from "/components/TodoList/index.jsx")
            const match = /\/components\/([^/]+)\/index\.jsx$/.exec(id);
            if (match) {
              return `component.${match[1]}`;
            }
          }

          const moduleInfo = getModuleInfo(id);
          // Moves large third-party scripts into their own chunk to avoid invalidating the cache of large modules
          if (
            id.includes("node_modules") &&
            moduleInfo?.code &&
            moduleInfo.code.length > 40000
          ) {
            // e.g. "/home/rethink-monoverse/node_modules/ua-parser-js/src/ua-parser.js"
            const match = /node_modules(?:\/@[\w-]+)?\/([\w-]+)/.exec(id);

            if (match) {
              const chunkName = match[1]; // e.g. "ua-parser-js"
              return `lib.${chunkName}`;
            }

            return `lib`;
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
