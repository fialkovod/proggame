import Profile from "../models/Profile.js";
import logger from "./logger.js";
const increasePowerAgent = (ctx) => {
  console.log("inc power agent");
  setInterval((ctx) => {
    //console.log("run inc power agent");
    Profile.updateMany(
      { $expr: { $lt: ["$currentPower", "$maxPower"] } },
      [
        {
          $set: {
            currentPower: {
              $cond: {
                if: {
                  $gte: [
                    { $sum: ["$currentPower", "$speedPower"] },
                    "$maxPower",
                  ],
                },
                then: "$maxPower",
                else: { $sum: ["$currentPower", "$speedPower"] },
              },
            },
          },
        },
      ],
      { new: true }
    )
      //.then(doc=>console.log(doc))
      .catch((err) => logger.debug(ctx, err));
  }, 60 * 60 * 1000); // once per hour
};

export const startAgents = (ctx) => {
  increasePowerAgent(ctx);
};
