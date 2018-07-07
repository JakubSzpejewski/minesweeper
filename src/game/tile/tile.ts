import { Geom } from 'phaser';
import { TILE_HEIGHT, TILE_WIDTH } from './consts';

export class Tile {
    public revealed: boolean = false;
    public box: Geom.Rectangle;
    private isBomb: boolean;

    constructor(
        isBomb: boolean,
        coordinates: Vector2Like,
    ) {
        this.isBomb = isBomb;
        this.box = new Geom.Rectangle(coordinates.x, coordinates.y, TILE_WIDTH, TILE_HEIGHT)
    }

    public getIsBomb(): undefined | boolean {
        return this.revealed ? this.isBomb : undefined;
    }
}