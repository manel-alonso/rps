import { Component, OnInit } from '@angular/core';
import { GameTypesEnum } from 'src/app/services/game-manager/enums/GameTypesEnum';
import { GameManagerService } from 'src/app/services/game-manager/game-manager.service';
import { ActionResultService } from 'src/app/services/action/action-result.service';
import { PlayerActionEnum } from 'src/app/services/action/enums/PlayerActionEnum';
import { ActionResultEnum } from 'src/app/services/action/enums/ActionResultEnum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameResult: ActionResultEnum;

  constructor(
    public gameManagerService: GameManagerService,
    public actionResultService: ActionResultService) { }

  ngOnInit() {
  }

  StartHumanGame() {
    // The player name needs to be assigned on the UI, as of this is just a demo it will not be added
    this.gameManagerService.GenerateGame(GameTypesEnum.HumanVsComputer, "player");
  }

  GameResultText() {
    // We're not using any string to label the result as it is not necessary
    // Needs to be changed if i18n is added
    return ActionResultEnum[this.gameResult];
  }

  ComputerActionText(playerNumber: number) {
    // We're not using any string to label the actions as it is not necessary
    // Needs to be changed if i18n is added
    return PlayerActionEnum[this.gameManagerService.players[playerNumber].actionPlayed];
  }

  PlayAction(action: PlayerActionEnum) {
    this.gameManagerService.players[0].actionPlayed = action;
    this.gameResult = this.gameManagerService.GenerateGameResult();
  }

  StartComputerGame() {
    this.gameManagerService.GenerateGame(GameTypesEnum.ComputerVsComputer, "player");
    this.gameResult = this.gameManagerService.GenerateGameResult();
  }

}
