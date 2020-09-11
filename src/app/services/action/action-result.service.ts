import { Injectable } from '@angular/core';
import { PlayerActionEnum } from './enums/PlayerActionEnum';
import { ActionResultEnum } from './enums/ActionResultEnum';
import { ResultPossibilities } from './ResultPossibilities';
import { Action } from './Action';

@Injectable({
  providedIn: 'root'
})
export class ActionResultService {

  /**
   * Playable actions
   * We're doing this as if we need to expand this playable actions, change the name
   * or even add new ones it is easy to do so
   */
  public actions: Action[] = [
    new Action("Rock", PlayerActionEnum.Rock),
    new Action("Paper", PlayerActionEnum.Paper),
    new Action("Scissors", PlayerActionEnum.Scissors),
    new Action("Lizard", PlayerActionEnum.Lizard),
    new Action("Spock", PlayerActionEnum.Spock),
  ];

  /**
   * Result possibilities over an action
   * We're doing this as it let us change the rules at our desire, or when we add
   * new actions we can easily say the win possibilities
   */
  public actionResultPossibilities: ResultPossibilities[] = [
    new ResultPossibilities(PlayerActionEnum.Paper, [PlayerActionEnum.Rock, PlayerActionEnum.Spock]),
    new ResultPossibilities(PlayerActionEnum.Rock, [PlayerActionEnum.Scissors, PlayerActionEnum.Lizard]),
    new ResultPossibilities(PlayerActionEnum.Scissors, [PlayerActionEnum.Paper, PlayerActionEnum.Lizard]),
    new ResultPossibilities(PlayerActionEnum.Lizard, [PlayerActionEnum.Spock, PlayerActionEnum.Paper]),
    new ResultPossibilities(PlayerActionEnum.Spock, [PlayerActionEnum.Scissors, PlayerActionEnum.Rock]),
  ];

  constructor() { }

  /**
   * Returns if the first action wins over the second
   * @param player1Action Action played by the first player
   * @param player2Action Action played by the second player
   */
  GenerateWinnerAction(player1Action: PlayerActionEnum, player2Action: PlayerActionEnum) {
    if(player1Action == player2Action) return ActionResultEnum.Tie;

    return this.actionResultPossibilities.find(pa => pa.action == player1Action).GenerateResultFromAction(player2Action);
  }
}
