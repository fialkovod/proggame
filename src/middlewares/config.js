// Add config info
import config from "../../quiz/js/config.js";

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const getConfig = async (ctx, next) => {
  ctx.config = config;
  return next();
};
