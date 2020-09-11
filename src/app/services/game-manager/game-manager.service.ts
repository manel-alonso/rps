import { Injectable } from '@angular/core';
import { Player } from './Player';
import { GameTypesEnum } from './enums/GameTypesEnum';
import { PlayerTypesEnum } from './enums/PlayerTypesEnum';
import { GameStatusEnum } from './enums/GameStatusEnum';
import { ActionResultService } from '../action/action-result.service';
import { ActionResultEnum } from '../action/enums/ActionResultEnum';
import { PlayerActionEnum } from '../action/enums/PlayerActionEnum';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  public players: Player[] = [];
  public gameType: GameTypesEnum;
  private gameStatus: GameStatusEnum;

  constructor(private actionResultService: ActionResultService) { }

  /**
   * Generate a game based on a game type
   * @param gameType type of game we're playing
   * @param playerName name of the player that plays the game
   */
  GenerateGame(gameType: GameTypesEnum, playerName: string) {
    // We need to empty the player list to generate a new game
    this.players = [];

    // Generate a human game with the computer
    if(gameType == GameTypesEnum.HumanVsComputer) {
      this.generateHumanVsComputerPlayers(playerName);
      this.gameStatus = GameStatusEnum.Started;
      this.gameType = GameTypesEnum.HumanVsComputer;
      return;
    }

    // Generate a computer game with the computer
    this.generateComputerVsComputerPlayers("The Computer");
    this.gameStatus = GameStatusEnum.Started;
    this.gameType = GameTypesEnum.ComputerVsComputer;
    return;
  }
  
  /**
   * End the game and calculate who won the game
   * @returns ActionResultEnum
   */
  GenerateGameResult(): ActionResultEnum {
    // We'll call this game ended as the result will be generated
    this.gameStatus = GameStatusEnum.Ended;
    
    // We assign the computer action in case there's computers in the game
    // We're using a foreach to avoid selecting it by players[i]
    this.players.forEach(player => {
      if(player.type == PlayerTypesEnum.Computer) player.GenerateRandomAction(this.actionResultService.actions);
    });

    // We call the action service to know who whon between two actions
    return this.actionResultService.GenerateWinnerAction(this.players[0].actionPlayed, this.players[1].actionPlayed);
  }

  /**
   * Check if the game has started or not
   * @returns boolean
   */
  IsGameStarted(): boolean {
    // We just check the game status
    if(this.gameStatus == GameStatusEnum.Started) return true;
    return false;
  }

  /**
   * Checks if any of the players is a human
   * @returns boolean
   */
  IsHumanPlaying(): boolean {
    // If there's no one playing we just return false
    if(this.players.length == 0) return false;

    // We use find here other than returning the game type if in the future there's more than one human player
    if(this.players.find(pt => pt.type == PlayerTypesEnum.Human)) return true;
    return false;
  }

  /**
   * Returns the player played action
   * This could be improved to use the player name, will need refactor on a player vs player example
   * @param selectedPlayer index of player to get the action
   */
  PlayerAction(selectedPlayer: number): PlayerActionEnum {
    // If we can't find the player specified we return null
    if(!this.players[selectedPlayer]) return null;

    return this.players[selectedPlayer].actionPlayed;
  }

  private generateHumanVsComputerPlayers(playerName: string) {
    // We generate a human player and the computer player
    let human = new Player(playerName, PlayerTypesEnum.Human);
    let computer = new Player(playerName, PlayerTypesEnum.Computer);

    this.players = [human, computer];
  }

  private generateComputerVsComputerPlayers(playerName: string) {
    // We generate the computer players
    let computer1 = new Player(playerName, PlayerTypesEnum.Computer);
    let computer2 = new Player(playerName, PlayerTypesEnum.Computer);

    this.players = [computer1, computer2];
  }

}
