import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  minify: false,
  treeshake: true,
  splitting: false,
  bundle: true,
  external: ['mitt']
})