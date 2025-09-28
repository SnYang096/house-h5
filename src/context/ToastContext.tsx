/* eslint-disable react-refresh/only-export-components */
import { ToastContainer } from '@/components/Toast';
import React, { createContext, useContext, useState } from 'react';
import { setAddToast } from '@/utils/toast';

// Toast 类型
type ToastType = 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

// Context Value
type ToastContextType = {
  addToast: (type: ToastType, title: string, message?: string) => void;
};

// 创建 Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider 组件
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, message };

    setToasts((prev) => [...prev, newToast]);

    // 3秒后自动移除
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* 渲染 Toast 容器组件 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// 自定义 Hook（可选，便于在 React 组件内使用）
export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext 必须在 ToastProvider 内部使用');
  }
  return context;
};