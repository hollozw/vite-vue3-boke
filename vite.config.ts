import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import VueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueJsx(), vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },

  server: {
    open: true,
    host: "0.0.0.0",
    port: 8888,
    // 是否开启 https
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true, // 允许跨域
        ws: true, // 允许websocket代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
