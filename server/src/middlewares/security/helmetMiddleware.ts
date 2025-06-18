import helmet from "helmet";
import { RequestHandler } from "express";

/**
 * Helmet middleware to secure HTTP headers
 * @see https://helmetjs.github.io/
 */
export const helmetMiddleware: RequestHandler = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  frameguard: { action: "deny" },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
});

// 🔒 Features Enabled
// Content-Security-Policy: Blocks loading of malicious scripts/styles.

// X-Frame-Options: Prevents clickjacking.

// X-XSS-Protection: Blocks reflected XSS attacks.

// X-Content-Type-Options: Prevents MIME sniffing.

// Referrer-Policy: Limits information sent in Referer headers.

// Hide-Powered-By: Hides Express tech stack info.
