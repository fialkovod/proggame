import Profile from "../models/Profile.js";
import logger from "./logger.js";

const updateJobsDoneAndReputationAndBudgetAgent = async (ctx) => {
  await Profile.updateMany(
    {},
    [
      {
        $set: {
          currentReputation: {
            $cond: {
              if: {
                $gte: [
                  "$doneTask",
                  10,
                ],
              },
              then: {$sum: ["$currentReputation", 1]},
              else: { $sum: ["$currentReputation", -1] },
            },
          },
        },
      },
      {
        $set: {
          currentBudget: {
            $subtract: [ {$add: ["$currentBudget", {$ceil: {$multiply: ["$currentSalary", "$doneTask", 0.1 ]}}]}, "$currentRent"]
          },
        },
      },
      {
        $set: {
          currentBudget: {
            $cond: {
              if: {
                $lte: [
                  "$currentBudget",
                  0,
                ],
              },
              then: 0,
              else: "$currentBudget",
            },
          },
        },
      },
      {$set: {doneTask: 0}}
    ],
    { new: true }
  )
}



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
      .catch((err) => logger.debug(ctx, err));
  }, 60 * 60 * 1000); // once per hour
};


const runDailyAgents = (ctx) => {
  updateJobsDoneAndReputationAndBudgetAgent();
}


const setRunningDaily = (ctx) => {
  let now = new Date();
  let millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
  if (millisTillTime < 0) {
    millisTillTime += 86400000; // it's after 10, try 10 tomorrow.
  }
  setTimeout(function(){
    runDailyAgents()
    setInterval(runDailyAgents, 86400000)
  }, millisTillTime);
}

export const startAgents = (ctx) => {
  increasePowerAgent(ctx);
  setRunningDaily();
};
