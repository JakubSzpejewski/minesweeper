import { Board } from "./game/board/board";
import { Game, AUTO, GameObjects, Scene } from 'phaser';
import { TILE_WIDTH, TILE_HEIGHT, TILE_OFFSET } from './game/tile/consts';
import { BOARD_WIDTH, BOARD_HEIGHT, BOMBS_QUANTITY } from "./game/board/consts";

const boardSize: [number, number] = [BOARD_WIDTH, BOARD_HEIGHT];

const board = new Board(boardSize, BOMBS_QUANTITY);

 
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
    for (const tileLine of board.board) {
        for (const tile of tileLine) {
            graphics.lineStyle(1, 0x000000);
            graphics.strokeRectShape(tile.box);
            if (tile.getIsBomb()) {
                graphics.lineStyle(4, 0xff0000);
                graphics.strokeCircle(tile.box.centerX, tile.box.centerY, TILE_WIDTH / 4);
            }
        }
    }
}

