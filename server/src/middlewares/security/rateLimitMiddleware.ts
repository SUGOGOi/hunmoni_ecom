// import rateLimit from "express-rate-limit";
// import { Request, Response } from "express";
// // import { BannedIP } from "../../models/bannedIPModel.js";
// import redisClient from "../../config/redisConfig.js";

// // Auto-cleanup: remove expired bans every hour
// setInterval(async () => {
//   try {
//     await BannedIP.deleteMany({ bannedUntil: { $lt: new Date() } });
//     console.log("Expired bans cleaned up");
//   } catch (error) {
//     console.error("Error during ban cleanup:", error);
//   }
// }, 24 * 60 * 60 * 1000); // every 24 hours

// //==============check if ip is currently ban or not
// const checkBan = async (
//   req: Request,
//   res: Response
// ): Promise<boolean | undefined> => {
//   try {
//     const existingBan = await BannedIP.findOne({ ip: req.ip });

//     if (existingBan && existingBan.bannedUntil > new Date()) {
//       const retryAfterMinutes = Math.ceil(
//         (existingBan.bannedUntil.getTime() - Date.now()) / (1000 * 60)
//       );
//       res.status(429).json({
//         success: false,
//         error: `You are temporarily banned. Try again in ${retryAfterMinutes} minute(s).`,
//       });
//       return true;
//     }

//     // Remove expired bans
//     if (existingBan && existingBan.bannedUntil <= new Date()) {
//       await BannedIP.deleteOne({ ip: req.ip });
//     }

//     return false;
//   } catch (error) {
//     console.error(`Rate limit checkBan error for IP ${req.ip}:`, error);
//     // You can either let it pass or fail-safe block the request
//     res.status(500).json({
//       success: false,
//       error: "Server error while checking IP status.",
//     });
//     return true; // or false depending on your fallback policy
//   }
// };

// // Helper to create a rate limiter with MongoDB ban logic
// const createRateLimiter = (options: {
//   windowMs: number;
//   max: number;
//   banThreshold: number;
//   banDurationMs: number;
//   message: string;
// }) => {
//   const { windowMs, max, banThreshold, banDurationMs, message } = options;

//   const limiter = rateLimit({
//     windowMs,
//     max,
//     standardHeaders: true,
//     legacyHeaders: false,
//     handler: async (req: Request, res: Response) => {
//       if (await checkBan(req, res)) return;

//       const ip = req.ip;

//       const redisKey = `ratelimit:${ip}`;

//       try {
//         const currentAttempts = await redisClient.incr(redisKey);

//         if (currentAttempts === 1) {
//           await redisClient.expire(redisKey, Math.ceil(windowMs / 1000));
//         }

//         if (currentAttempts >= banThreshold) {
//           await BannedIP.findOneAndUpdate(
//             { ip },
//             {
//               ip,
//               bannedUntil: new Date(Date.now() + banDurationMs),
//               reason: `Rate limit exceeded`,
//             },
//             { upsert: true }
//           );

//           await redisClient.del(redisKey);

//           return res.status(429).json({
//             success: false,
//             error: `Too many repeated requests. You are banned for ${Math.floor(
//               banDurationMs / 60000
//             )} minutes.`,
//           });
//         }

//         const retryAfterMinutes = Math.ceil(windowMs / (1000 * 60));

//         res.status(429).json({
//           success: false,
//           error: `${message}. Try again in ${retryAfterMinutes} minute(s).`,
//         });
//       } catch (error) {
//         console.error("Error banning IP:", error);
//         res.status(500).json({
//           success: false,
//           error: "Error banning IP. Please try again later.",
//         });
//         return;
//       }
//     },
//   });

//   return limiter;
// };

// // Export different limiters
// export const generalRateLimiter = createRateLimiter({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   banThreshold: 200,
//   banDurationMs: 30 * 60 * 1000,
//   message: "Too many requests",
// });

// export const authRateLimiter = createRateLimiter({
//   windowMs: 10 * 60 * 1000,
//   max: 5,
//   banThreshold: 10,
//   banDurationMs: 15 * 60 * 1000,
//   message: "Too many login/signup attempts",
// });

// export const adminRateLimiter = createRateLimiter({
//   windowMs: 30 * 60 * 1000,
//   max: 4,
//   banThreshold: 4,
//   banDurationMs: 60 * 60 * 1000,
//   message: "Too many admin actions",
// });
