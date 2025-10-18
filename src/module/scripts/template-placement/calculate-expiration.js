import { CONSTS } from "../../consts";

export const calculateExpiration = (rollData = {}, flags = {}) => {
    const now = game.time.worldTime;

    const deletionType = flags[CONSTS.flags.deletion] || CONSTS.deletionOptions.doNotDelete;

    switch (deletionType) {
        case CONSTS.deletionOptions.doNotDelete:
            return undefined;
        case CONSTS.deletionOptions.endOfTurn:
            return {
                at: now,
                initiative: game?.combat?.combatant?.initiative || 99,
            };
        case CONSTS.deletionOptions.timespan:
            let units = flags[CONSTS.flags.deletionUnit] || 0;
            units = !isNaN(+units) ? +units : units;
            const interval = flags[CONSTS.flags.deletionInterval] || CONSTS.deletionIntervals.rounds;

            const duration = (() => {
                switch (interval) {
                    case CONSTS.deletionIntervals.rounds:
                        return units * CONFIG.time.roundTime;
                    case CONSTS.deletionIntervals.minutes:
                        return units * 60;
                    case CONSTS.deletionIntervals.hours:
                        return (units * 60) & 60;
                }
            })();

            return {
                at: now + duration,
                initiative: game?.combat?.combatant?.initiative || 0,
            };
    }
};
