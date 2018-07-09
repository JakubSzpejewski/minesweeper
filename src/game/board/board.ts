import { Tile } from "../tile/tile";
import { TILE_WIDTH, TILE_HEIGHT, TILE_OFFSET } from '../tile/consts';
import { Vector2 } from "../../shared/utils";

export class Board {

    public board: Tile[][] = [];
    private bombs: number[] = [];

    constructor(
        size: [number, number],
        bombCount: number,
    ) {
        this.init(size, bombCount);
    }

    private init(size: [number, number], bombCount: number): void {
        this.rollBombs(size, bombCount);

        this.populateBoard(size);
    }


    public revealTile(i: number, j: number): void {
        const tile = this.board[i][j];
        if (tile.isRevealed()) {
            return;
        }
        this.calculateTileValue(i, j);
        tile.reveal();
        if (!tile.isBomb && tile.value === 0) {
            for (const neighbour of this.getNeighbours(i, j)) {
                this.revealTile(neighbour.boardPosition[0], neighbour.boardPosition[1]);
            }
        }
    }

    private getNeighbours(i: number, j: number): Tile[] {
        const ret: Tile[] = [];
        for (let k = i - 1; k <= i + 1; k++) {
            for (let l = j - 1; l <= j + 1; l++) {
                if (k === i && l === j) {
                    continue;
                }
                const tile: Tile | undefined = (this.board[k] || [])[l];
                if (tile !== undefined) {
                    ret.push(tile);
                }
            }
        }
        return ret;
    }

    private calculateTileValue(i: number, j: number): void {
        let currentTile = this.board[i][j];
        if (currentTile.isBomb) {
            return;
        }

        const neighbours: Tile[] = this.getNeighbours(i, j);

        for (const neighbour of neighbours) {
            if (neighbour.isBomb) {
                currentTile.value++;
            }
        }
    }

    private populateBoard(size: [number, number]): void {
        let currentCoordinates: Vector2 = { x: TILE_OFFSET, y: TILE_OFFSET };
        for (let i = 0; i < size[0]; i++) {

            currentCoordinates.x = TILE_OFFSET;
            this.board[i] = [];

            for (let j = 0; j < size[1]; j++) {
                this.board[i].push(new Tile(this.isTileBomb(size, i, j), currentCoordinates, [i, j]));
                currentCoordinates.x += TILE_WIDTH + TILE_OFFSET;
            }
            currentCoordinates.y += TILE_HEIGHT + TILE_OFFSET;
        }
    }

    private rollBombs(size: [number, number], bombCount: number): void {
        const tilesCount = size[0] * size[1];
        for (let i = 0; i < bombCount; i++) {
            let randomNumber: number;
            do {
                randomNumber = Math.floor(Math.random() * tilesCount);
            } while (this.bombs.some(v => randomNumber === v))
            this.bombs.push(randomNumber);
        }
    }

    private isTileBomb(size: [number, number], i: number, j: number): boolean {
        const index = (v: number) => Math.floor(v / size[0]);
        const jndex = (v: number) => v % size[1];
        const a = (v: number) => i === index(v);
        const b = (v: number) => j === jndex(v);
        return this.bombs.some(v => a(v) && b(v));
    }
}