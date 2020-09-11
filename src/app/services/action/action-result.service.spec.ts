import { TestBed } from '@angular/core/testing';

import { ActionResultService } from './action-result.service';
import { PlayerActionEnum } from './enums/PlayerActionEnum';
import { ActionResultEnum } from './enums/ActionResultEnum';

describe('ActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionResultService = TestBed.get(ActionResultService);
    expect(service).toBeTruthy();
  });

  it('should generate rock winner over scissors', () => {
    const service: ActionResultService = TestBed.get(ActionResultService);

    let result = service.GenerateWinnerAction(PlayerActionEnum.Rock, PlayerActionEnum.Scissors);

    expect(result).toBe(ActionResultEnum.Win);
  });

  it('should generate rock not winner over paper', () => {
    const service: ActionResultService = TestBed.get(ActionResultService);

    let result = service.GenerateWinnerAction(PlayerActionEnum.Rock, PlayerActionEnum.Paper);

    expect(result).toBe(ActionResultEnum.Lose);
  });

  it('should generate rock tie with rock', () => {
    const service: ActionResultService = TestBed.get(ActionResultService);

    let result = service.GenerateWinnerAction(PlayerActionEnum.Rock, PlayerActionEnum.Rock);

    expect(result).toBe(ActionResultEnum.Tie);
  });
});
