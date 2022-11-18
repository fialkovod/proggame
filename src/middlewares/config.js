// Add config info
import configjs from "../../quiz/js/config.js";
import configpython from "../../quiz/python/config.js";
import configsolidity from "../../quiz/solidity/config.js";

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const getConfig = async (ctx, next) => {
  if(ctx.profile?.profileName === 'js') ctx.config = configjs;
  if(ctx.profile?.profileName === 'python') ctx.config = configpython;
  if(ctx.profile?.profileName === 'solidity') ctx.config = configsolidity;

  return next();
};
