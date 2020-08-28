import { terser } from "rollup-plugin-terser";

export default [{
  input: "./src/parallax.js",
  output: [
    { file: "./dist/parallax.js", format: "iife", name: "bundle" },
    { file: "./dist/parallax.min.js", format: "iife", name: "bundle", plugins: [terser()] }
  ],
}];