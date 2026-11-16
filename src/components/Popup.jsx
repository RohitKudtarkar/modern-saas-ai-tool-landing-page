
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

function Popup({
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText,
  onConfirm,
  onCancel,
}) {
  const popupIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = popupIcons[type] || Info;

  return (
    <div className="popup-overlay">
      <div
        className={`popup-modal popup-${type}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-message"
      >
        <div className="popup-icon">
          <Icon size={30} />
        </div>

        <h2 id="popup-title">{title}</h2>

        <p id="popup-message">{message}</p>

        <div className="popup-actions">
          {cancelText && (
            <button
              type="button"
              className="popup-cancel-button"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            className="popup-confirm-button"
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
