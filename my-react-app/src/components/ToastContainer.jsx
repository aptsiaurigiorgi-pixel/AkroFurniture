import { AnimatePresence } from "motion/react";
import Toast from "./Toast.jsx";

function ToastContainer({ toasts, removeToast }) {
  return (
    <AnimatePresence mode="popLayout">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </AnimatePresence>
  );
}

export default ToastContainer;
