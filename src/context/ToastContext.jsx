
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import Popup from "../components/Popup";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [popup, setPopup] = useState(null);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  // Show a notification with an OK button
  const showToast = useCallback((message, type = "success") => {
    setPopup({
      title:
        type === "success" ? "Success" :
        type === "error" ? "Error" :
        type === "warning" ? "Warning" : "Information",
      message,
      type,
      confirmText: "OK",
    });
  }, []);

  // Show a confirmation popup
  const showPopup = useCallback((options) => {
    setPopup(options);
  }, []);

  const handleConfirm = () => {
  const confirmAction = popup?.onConfirm;

  closePopup();

  if (confirmAction) {
    confirmAction();
  }
};

  const handleCancel = () => {
    if (popup?.onCancel) {
      popup.onCancel();
    }

    closePopup();
  };

  return (
    <ToastContext.Provider
      value={{ showToast, showPopup, closePopup }}
    >
      {children}

      {popup && (
        <Popup
          title={popup.title}
          message={popup.message}
          type={popup.type || "info"}
          confirmText={popup.confirmText || "OK"}
          cancelText={popup.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
