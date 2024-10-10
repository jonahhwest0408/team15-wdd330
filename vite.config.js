import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        about: resolve(__dirname, "src/product-listing/index.html"), //new file W03
        search: resolve(__dirname, "src/search/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
      },
    },
  },
});