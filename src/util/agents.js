import User from "../models/User.js";
import logger from "./logger.js";
const increasePowerAgent = (ctx) => {
    console.log("inc power agent");
    setTimeout(ctx => {
        User.updateMany(
            {currentPower: {$lt: +"$maxPower"}}, 
            { $set: {currentPower: (+"$currentPower"+(+"$speedPower"))}}
            )
            .then(doc=>console.log(doc))
            .catch(err=>logger.debug(ctx, err))
    }, 5000);
}

export const startAgents = (ctx) => {
    increasePowerAgent(ctx)
}