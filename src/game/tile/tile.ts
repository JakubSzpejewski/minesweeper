import { Geom } from 'phaser';
import { TILE_HEIGHT, TILE_WIDTH } from './consts';

export class Tile {
    public revealed: boolean = true;
    public box: Geom.Rectangle;
    public isBomb: boolean;

    public value: number = 0;

    constructor(
        isBomb: boolean,
        coordinates: Vector2Like,
    ) {
        this.isBomb = isBomb;
        this.box = new Geom.Rectangle(coordinates.x, coordinates.y, TILE_WIDTH, TILE_HEIGHT)
    }

}