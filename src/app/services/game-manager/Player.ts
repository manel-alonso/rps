import { PlayerTypesEnum } from './enums/PlayerTypesEnum';
import { PlayerActionEnum } from '../action/enums/PlayerActionEnum';
import { Action } from '../action/Action';

export class Player {
    public name: string;
    public actionPlayed: PlayerActionEnum;
    public type: PlayerTypesEnum;

    constructor(playerName: string, playerType: PlayerTypesEnum) {
        this.name = playerName;
        this.type = playerType;
    }


    /**
     * Returns a random action to be played by the computer
     * TODO: Expandable to a seed for unique random plays
     * @param actions playable actions
     */
    GenerateRandomAction(actions: Action[]) {
        // We're doing a random without a seed to make it simple
        // We could use a seed to make it more random and each iteration unique
        let randomNumber = Math.floor(Math.random() * actions.length);
        this.actionPlayed = actions[randomNumber].type;
    }
}