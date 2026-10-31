import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="pointer-events-auto flex items-start justify-between p-3.5 rounded-xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-xl text-xs select-none"
            >
              <div className="flex items-start gap-2.5">
                {toast.type === 'success' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC]">{toast.title}</div>
                  {toast.message && (
                    <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] mt-0.5">
                      {toast.message}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
