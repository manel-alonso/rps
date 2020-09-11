import { TestBed } from '@angular/core/testing';

import { GameManagerService } from './game-manager.service';
import { GameTypesEnum } from './enums/GameTypesEnum';
import { PlayerActionEnum } from '../action/enums/PlayerActionEnum';
import { ActionResultEnum } from '../action/enums/ActionResultEnum';
import { Player } from './Player';

describe('GameManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);
    expect(service).toBeTruthy();
  });

  it('should generate a game with player and computer', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);
    
    service.GenerateGame(GameTypesEnum.HumanVsComputer, "test");

    expect(service.IsGameStarted()).toBeTruthy();
  });

  it('should generate a game with computer and computer', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);
    
    service.GenerateGame(GameTypesEnum.ComputerVsComputer, "test");

    expect(service.IsGameStarted()).toBeTruthy();
  });

  it('should generate a game result with 2 actions', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);
    
    service.GenerateGame(GameTypesEnum.HumanVsComputer, "test");
    service.players[0].actionPlayed = PlayerActionEnum.Rock;
    service.players[1].actionPlayed = PlayerActionEnum.Scissors;

    let gameResult = service.GenerateGameResult();

    expect(service.IsGameStarted()).toBeFalsy();
    expect(gameResult).toBeTruthy();
  });

  it('should have not have a human playing if there is no players', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);

    expect(service.IsHumanPlaying()).toBeFalsy();
  });

  it('should have a human playing on human vs computer', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);

    service.GenerateGame(GameTypesEnum.HumanVsComputer, "test");

    expect(service.IsHumanPlaying()).toBeTruthy();
  });

  it('should not have a human playing on computer vs computer', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);

    service.GenerateGame(GameTypesEnum.ComputerVsComputer, "test");

    expect(service.IsHumanPlaying()).toBeFalsy();
  });

  it('should return null if player not found on player action', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);

    expect(service.PlayerAction(1)).toBe(null);
  });

  it('should return the player action', () => {
    const service: GameManagerService = TestBed.get(GameManagerService);

    service.GenerateGame(GameTypesEnum.HumanVsComputer, "test");
    service.players[0].actionPlayed = PlayerActionEnum.Scissors;

    expect(service.PlayerAction(0)).toBe(PlayerActionEnum.Scissors);
  });
});