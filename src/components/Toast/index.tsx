import React from 'react';
import './index.scss';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContainerProps = {
  toasts: Toast[];
  onRemove: (id: string) => void;
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-title">{toast.title}</div>
          {toast.message && <div className="toast-message">{toast.message}</div>}
          <button className="toast-close" onClick={() => onRemove(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};