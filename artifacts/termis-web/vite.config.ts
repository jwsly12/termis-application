import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  // No Docker, usamos o nome do serviço 'api' definido no docker-compose
  const apiTarget = env.VITE_API_URL || "http://api:3000";

  return {
    oxc: false, 

    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          jsx: 'react-jsx',
          target: 'esnext',
          baseUrl: '.',
          paths: { "@/*": ["./src/*"] }
        }
      }
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    server: {
      port: 5173,
      host: "0.0.0.0",
      hmr: { overlay: false },
      watch: {
        usePolling: true,
        interval: 100,
      },
      // --- ADICIONE ESTE BLOCO ABAIXO ---
     proxy: {
  "/api": {
    // Tente usar o nome exato do container definido no compose
    target: "http://termis_api:3000", 
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
    secure: false,
  },
},
    },
  };
});