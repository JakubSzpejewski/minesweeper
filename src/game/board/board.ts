import { Tile } from "../tile/tile";
import { TILE_WIDTH, TILE_HEIGHT, TILE_OFFSET } from '../tile/consts';

export class Board {
    private isInitialized: boolean = false;

    public board: Tile[][] = [];

    constructor(
        size: [number, number],
        bombCount: number,
    ) {
        if (!this.isInitialized) {
            this.init(size, bombCount);
        }
    }

    private init(size: [number, number], bombCount: number): void {
        let currentCoordinates: Vector2Like = { x: TILE_OFFSET, y: TILE_OFFSET };
        for (let i = 0; i < size[0]; i++) {
            currentCoordinates.x = TILE_OFFSET;
            this.board[i] = [];

            for (let j = 0; j < size[1]; j++) {
                bombCount;
                this.board[i].push(new Tile(Math.round(Math.random()) === 1, currentCoordinates));
                currentCoordinates.x += TILE_WIDTH + TILE_OFFSET;
            }
            currentCoordinates.y += TILE_HEIGHT + TILE_OFFSET;
        }
    }
}