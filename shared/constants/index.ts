// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
  },
  PROPERTIES: {
    LIST: "/properties",
    CREATE: "/properties",
    GET: (id: string) => `/properties/${id}`,
    UPDATE: (id: string) => `/properties/${id}`,
    DELETE: (id: string) => `/properties/${id}`,
  },
  APPLICATIONS: {
    LIST: "/applications",
    CREATE: "/applications",
    GET: (id: string) => `/applications/${id}`,
    APPROVE: (id: string) => `/applications/${id}/approve`,
    REJECT: (id: string) => `/applications/${id}/reject`,
  },
  PAYMENTS: {
    LIST: "/payments",
    CREATE: "/payments",
    VERIFY: (ref: string) => `/payments/verify/${ref}`,
    HISTORY: "/payments/history",
  },
  SERVICE_REQUESTS: {
    LIST: "/service-requests",
    CREATE: "/service-requests",
    GET: (id: string) => `/service-requests/${id}`,
    UPDATE: (id: string) => `/service-requests/${id}`,
  },
};

// UI Constants
export const COLORS = {
  PRIMARY: "#0A5C5C",
  SECONDARY: "#FFB347",
  DARK: "#2C3E50",
};

export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "duplex",
  "office",
  "commercial",
];
export const PROPERTY_STATUSES = ["available", "occupied", "maintenance"];
export const APPLICATION_STATUSES = ["pending", "under_review", "approved", "rejected"];
export const SERVICE_REQUEST_STATUSES = ["pending", "in_progress", "resolved"];

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_PAGE = 1;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "cil_auth_token",
  REFRESH_TOKEN: "cil_refresh_token",
  USER: "cil_user",
};
