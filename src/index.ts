import { Board } from "./game/board/board";
import { Game, AUTO, GameObjects, Scene } from 'phaser';
import { TILE_WIDTH, TILE_HEIGHT, TILE_OFFSET } from './game/tile/consts';

const boardSize: [number, number] = [20, 20];

const board = new Board(boardSize, 0);
console.log(board);

const game = new Game({
    type: AUTO,
    width: boardSize[0] * TILE_WIDTH + (boardSize[0] + 1) * TILE_OFFSET,
    height: boardSize[1] * TILE_HEIGHT + (boardSize[1] + 1) * TILE_OFFSET,
    scene: {
        create: create,
    },
    backgroundColor: 0xffffff,
});

function create() {
    // Javascript style this...
    const graphics: GameObjects.Graphics = (<Scene>this).add.graphics();
    graphics.lineStyle(1, 0x000000);
    for (const tileLine of board.board) {
        for (const tile of tileLine) {
            graphics.strokeRectShape(tile.box);
        }
    }
}
