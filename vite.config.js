// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "10.0.60.210",
//     port: 3009,
//   },
// });

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    host: "145.223.75.211",
    port: 3003,
=======
    host: "31.97.128.5",
    port: 3009,
  },
  build: {
    sourcemap: false, // disables source maps for production
    minify: "esbuild", // faster minifier
>>>>>>> 2e44369c599bf1c92c7fd66327bebf00ca3aed7d
  },
});
