import { PlayerActionEnum } from "./enums/PlayerActionEnum";
import { ActionResultEnum } from './enums/ActionResultEnum';

export class ResultPossibilities {

    public action: PlayerActionEnum;
    private winsTo: PlayerActionEnum[];

    constructor(actionPlayed: PlayerActionEnum, wins: PlayerActionEnum[]) {
        this.action = actionPlayed;
        this.winsTo = wins;
    }

    /**
     * Returns the action result
     * @param action action played against
     */
    GenerateResultFromAction(action: PlayerActionEnum) {
        // This is the best method to detect if an action wins another
        // In rock, paper, scissors, etc. You don't need to know all the possible results
        // Just the ones that win to others
        if(this.winsTo.includes(action)) return ActionResultEnum.Win;

        return ActionResultEnum.Lose;
    }
}