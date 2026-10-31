import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ShieldAlert, AlertCircle, Info, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 'n1',
      type: 'urgent',
      title: 'Digital Arrest Advisory Issued',
      desc: 'MHA clarifies law enforcement does not conduct online arrests over video call.',
      time: '2 hours ago',
      link: '/cybercrime',
    },
    {
      id: 'n2',
      type: 'info',
      title: 'Zero FIR Rights Updated',
      desc: 'Learn how to register a complaint across any police station regardless of jurisdiction.',
      time: '1 day ago',
      link: '/rights',
    },
    {
      id: 'n3',
      type: 'success',
      title: 'Offline Emergency Cache Active',
      desc: 'Emergency helplines are synchronized for offline access on this device.',
      time: 'Active',
      link: '/emergency',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/30 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-sm mt-14 bg-white dark:bg-[#2A251A] rounded-2xl shadow-2xl border border-[#E6DCC3] dark:border-[#4A4230] p-4 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
                <h3 className="font-bold text-[#3B3426] dark:text-[#F3EDDC] text-sm">
                  Citizen Advisories & Alerts
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {notifications.map(n => (
                <Link
                  key={n.id}
                  to={n.link}
                  onClick={onClose}
                  className="block p-3 rounded-xl bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/60 hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] border border-[#E6DCC3]/50 dark:border-[#4A4230]/50 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    {n.type === 'urgent' && <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />}
                    {n.type === 'info' && <Info className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] mt-0.5 flex-shrink-0" />}
                    {n.type === 'success' && <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />}
                    <div>
                      <div className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">{n.title}</div>
                      <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] mt-0.5">{n.desc}</div>
                      <div className="text-[10px] text-[#8A7545] dark:text-[#C3B091] mt-1 font-medium">{n.time}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-[#E6DCC3] dark:border-[#4A4230] text-center">
              <span className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                Official Advisories (Demo Feed)
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
