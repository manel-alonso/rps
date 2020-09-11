import { PlayerActionEnum } from './enums/PlayerActionEnum';

export class Action {
    public name: string;
    public type: PlayerActionEnum;

    constructor(actionName: string, actionType: PlayerActionEnum) {
        this.name = actionName;
        this.type = actionType;
    }
}