import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameComponent } from './game/game.component';
import { CommonModule } from '@angular/common';  

/**
 * Component module to easily manage all of our components
 * This is just a "best practise" I do but it doesn't really matter on this demo with one component
 */
@NgModule({
	declarations: [
        GameComponent
    ],
    imports: [
        CommonModule
    ],
	exports: [
        GameComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
