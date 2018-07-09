import { TILE_HEIGHT, TILE_WIDTH } from './consts';
import { Vector2 } from '../../shared/utils';
import { Rectangle } from '../../shared/rectangle';

export class Tile {
    private revealed: boolean = false;
    public rect: Rectangle;

    public value: number = 0;

    public isMarked: boolean = false;

    constructor(
        public isBomb: boolean,
        coordinates: Vector2,
        public boardPosition: [number, number],
    ) {
        this.isBomb = isBomb;
        this.rect = new Rectangle({ x: coordinates.x, y: coordinates.y, width: TILE_WIDTH, height: TILE_HEIGHT });
    }

    public isRevealed(): boolean {
        return this.revealed;
    }

    public reveal(): void {
        this.revealed = true;
    }

}