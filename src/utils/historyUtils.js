
const LEGACY_HISTORY_KEY = "saasHistory";

// Get the currently logged-in user's email.
const getCurrentUserEmail = () => {
  try {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    return currentUser?.email?.trim().toLowerCase() || null;
  } catch {
    return null;
  }
};

// Generate a separate storage key for each user.
const getUserHistoryKey = () => {
  const email = getCurrentUserEmail();

  return email
    ? `saasHistory_${encodeURIComponent(email)}`
    : null;
};

// Read the current user's activity history.
export const getUserHistory = () => {
  try {
    const userKey = getUserHistoryKey();

    if (!userKey) return [];

    const userHistory = localStorage.getItem(userKey);

    if (userHistory !== null) {
      const parsedHistory = JSON.parse(userHistory);
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    }

    // Migrate existing shared history to the currently logged-in user.
    const legacyHistory = JSON.parse(
      localStorage.getItem(LEGACY_HISTORY_KEY) || "[]"
    );

    const history = Array.isArray(legacyHistory)
      ? legacyHistory
      : [];

    localStorage.setItem(userKey, JSON.stringify(history));
    localStorage.removeItem(LEGACY_HISTORY_KEY);

    return history;
  } catch {
    return [];
  }
};

// Save the current user's activity history.
export const saveUserHistory = (history) => {
  const userKey = getUserHistoryKey();

  if (!userKey || !Array.isArray(history)) return;

  localStorage.setItem(userKey, JSON.stringify(history));
};

// Clear only the currently logged-in user's history.
export const clearUserHistory = () => {
  const userKey = getUserHistoryKey();

  if (!userKey) return;

  localStorage.removeItem(userKey);
};
