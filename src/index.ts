import { Board } from "./game/board/board";
import { DEFAULT_BOARD_WIDTH, DEFAULT_BOARD_HEIGHT, DEFAULT_BOMBS_QUANTITY } from "./game/board/consts";
import { TILE_HEIGHT, TILE_OFFSET, TILE_WIDTH, VALUE_TO_COLOR } from "./game/tile/consts";
let board: Board;
let processing: p5;

const start = (width: number, height: number, bombs: number) => {
    board = new Board([width, height], bombs);

    if (processing) {
        processing.remove();
    }

    processing = new p5((p: p5) => {
        p.setup = () => {
            const canvas = p.createCanvas(width * (TILE_WIDTH + TILE_OFFSET) + TILE_OFFSET, height * (TILE_HEIGHT + TILE_OFFSET) + TILE_OFFSET);
            (<any>canvas).parent('canvasContainer');
        };

        p.mouseReleased = () => {
            for (let i = 0; i < board.board.length; i++) {
                for (let j = 0; j < board.board[i].length; j++) {
                    const tile = board.board[i][j];
                    if (p.mouseButton === p.LEFT) {
                        if (tile.rect.contains(p.mouseX, p.mouseY) && !tile.isMarked) {
                            board.revealTile(i, j);
                        }
                    } else if (p.mouseButton === p.RIGHT) {
                        if (tile.rect.contains(p.mouseX, p.mouseY)) {
                            tile.isMarked = !tile.isMarked;
                        }
                    }
                }
            }
        };

        p.draw = () => {
            for (const tileLine of board.board) {
                for (const tile of tileLine) {
                    p.stroke('#000000');
                    p.strokeWeight(1);
                    p.fill(tile.isRevealed() ? '#ffffff' : '#cecece');
                    p.rect(tile.rect.x, tile.rect.y, tile.rect.width, tile.rect.height);
                    if (tile.isRevealed()) {
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
                    } else if (!tile.isRevealed() && tile.isMarked) {
                        p.stroke(0, 0, 255);
                        p.strokeWeight(5);
                        p.ellipse(tile.rect.middle.x, tile.rect.middle.y, TILE_WIDTH / 1.5, TILE_HEIGHT / 1.5)
                    }
                }
            }
        };
    })
}

(<any>window).start = start;
start(DEFAULT_BOARD_WIDTH, DEFAULT_BOARD_HEIGHT, DEFAULT_BOMBS_QUANTITY);
