// src/lib/toastGlobal.ts
let addToast: ((type: string, title: string, message?: string) => void) | null = null;

export const setAddToast = (fn: (type: string, title: string, message?: string) => void) => {
  addToast = fn;
};

export const toast = {
  success: (title: string, message?: string) => {
    addToast?.('success', title, message);
  },
  error: (title: string, message?: string) => {
    addToast?.('error', title, message);
  },
  info: (title: string, message?: string) => {
    addToast?.('info', title, message);
  },
  warning: (title: string, message?: string) => {
    addToast?.('warning', title, message);
  },
};