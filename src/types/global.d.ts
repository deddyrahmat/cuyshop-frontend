export {};

declare global {
  interface Window {
    global: any; // 👈️ turn off type checking
  }
}
