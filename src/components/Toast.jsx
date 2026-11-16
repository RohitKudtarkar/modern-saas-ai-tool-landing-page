
import { useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const toastConfig = {
    success: {
      icon: CheckCircle,
      title: "Success",
    },
    error: {
      icon: AlertCircle,
      title: "Error",
    },
    warning: {
      icon: AlertTriangle,
      title: "Warning",
    },
    info: {
      icon: Info,
      title: "Information",
    },
  };

  const config = toastConfig[type] || toastConfig.success;
  const Icon = config.icon;

  return (
    <div
      className={`toast-notification toast-${type}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon">
        <Icon size={22} />
      </div>

      <div className="toast-content">
        <strong>{config.title}</strong>
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="toast-close-button"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;
