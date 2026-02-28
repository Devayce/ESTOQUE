/// <reference types="vite/client" />
// Ambient declarations for static assets and Vite env
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  // add other env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
