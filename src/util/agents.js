import User from "../models/User.js";
import logger from "./logger.js";
const increasePowerAgent = (ctx) => {
    console.log("inc power agent");
    setInterval(ctx => {
        console.log("run inc power agent");
        User.updateMany(
            {currentPower: {$lte: "$maxPower"}}, 
            [{ $set: {currentPower: {$sum:["$currentPower","$speedPower"]}}}]   //+"$currentPower"+(+"$speedPower")
            )
            .then(doc=>console.log(doc))
            .catch(err=>logger.debug(ctx, err))
    }, 1000);
}

export const startAgents = (ctx) => {
    increasePowerAgent(ctx)
}