// Image imports in stories (Vite resolves them to URLs).
declare module "*.jpg" {
  const src: string
  export default src
}
