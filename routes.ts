/**
 * An Array of routes that are accessible in public
 * These Routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/api/categories",
  "/api/products",
  "/api/product",
  /^\/api\/product\/\w+\/related-products$/,
  /^\/api\/product\/\w+\/reviews$/,
  /^\/product\/\w+$/,
  /^\/api\/product\/\w+$/,
];

/**
 * An Array of routes that used for authentication
 * These Routes will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The Prefix for API authentication routes
 * Routes That Starts with this Prefix will be use for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
