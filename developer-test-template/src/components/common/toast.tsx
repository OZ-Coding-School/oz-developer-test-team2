import { AnimatePresence, motion } from 'motion/react';

type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}