import { Board } from "./game/board/board";
import { BOARD_WIDTH, BOARD_HEIGHT, BOMBS_QUANTITY } from "./game/board/consts";
import { TILE_HEIGHT, TILE_OFFSET, TILE_WIDTH, VALUE_TO_COLOR } from "./game/tile/consts";


const boardSize: [number, number] = [BOARD_WIDTH, BOARD_HEIGHT];

const board = new Board(boardSize, BOMBS_QUANTITY);


new p5((p: p5) => {
    p.setup = () => {
        p.resizeCanvas(BOARD_WIDTH * (TILE_WIDTH + TILE_OFFSET) + TILE_OFFSET, BOARD_HEIGHT * (TILE_HEIGHT + TILE_OFFSET) + TILE_OFFSET);
    };

    p.draw = () => {
        for (const tileLine of board.board) {
            for (const tile of tileLine) {
                p.stroke(0, 0, 0);
                p.strokeWeight(1);
                p.fill(p.color(0xffffff));
                p.rect(tile.rect.x, tile.rect.y, tile.rect.width, tile.rect.height);
                if (tile.isBomb) {
                    p.stroke(255, 0, 0);
                    p.strokeWeight(5);
                    p.ellipse(tile.rect.middle.x, tile.rect.middle.y, TILE_WIDTH / 1.5, TILE_HEIGHT / 1.5)
                } else {
                    // fuck p5 positioning
                    p.fill(VALUE_TO_COLOR[tile.value]);
                    p.stroke(VALUE_TO_COLOR[tile.value])
                    p.textSize(TILE_HEIGHT);
                    p.text(tile.value.toString(), tile.rect.x + TILE_WIDTH / 4, tile.rect.bottom - TILE_HEIGHT / 8);
                }
            }
        }
    };
})