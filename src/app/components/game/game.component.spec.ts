import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GameManagerService } from 'src/app/services/game-manager/game-manager.service';
import { ActionResultService } from 'src/app/services/action/action-result.service';

// We're mocking the services as we don't test them here
class GameManagerServiceMock {
  players: any = [{}, {}]
  IsGameStarted() { return false }
  IsHumanPlaying() { return false }
  GenerateGame() {}
  PlayerAction() {}
}
class ActionResultServiceMock {}

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      providers: [
        { provide: GameManagerService, useClass: GameManagerServiceMock },
        { provide: ActionResultService, useClass: ActionResultServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
