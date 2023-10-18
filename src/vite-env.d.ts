import "vite/client";

interface ImportMeta {
  env: {
    VITE_GOOGLE_MAPS_API_KEY: string;
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
  };
}
/// <reference types="vite/client" />
