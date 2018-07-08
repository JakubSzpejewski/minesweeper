import { TILE_HEIGHT, TILE_WIDTH } from './consts';
import { Vector2 } from '../../shared/utils';
import { Rectangle } from '../../shared/rectangle';

export class Tile {
    private revealed: boolean = false;
    public rect: Rectangle;
    public isBomb: boolean;

    public value: number = 0;

    constructor(
        isBomb: boolean,
        coordinates: Vector2,
    ) {
        this.isBomb = isBomb;
        this.rect = new Rectangle({ x: coordinates.x, y: coordinates.y, width: TILE_WIDTH, height: TILE_HEIGHT });
    }

    public isRevealed(): boolean {
        return this.revealed;
    }

    public onClick(): void {
        this.reveal();
    }

    private reveal(): void {
        this.revealed = true;
    }

}