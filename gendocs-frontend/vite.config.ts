import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

function srcPath(subdir: string) {
    return path.join(__dirname, "src", subdir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server:{
      proxy: {
        '/api': {
            target: 'http://localhost',
            changeOrigin: true,
        }
      }
    },
    resolve: {
        alias: {
            components: srcPath("components/"),
            pages: srcPath("pages/"),
            hooks: srcPath("hooks/"),
            contexts: srcPath("contexts/"),
            layout: srcPath("layout/"),
            models: srcPath("models/"),
            services: srcPath("services/"),
            utils: srcPath("utils/"),
            providers: srcPath("providers/"),
            reducers: srcPath("reducers/"),
            routes: srcPath("routes/"),
        },
    },
});
