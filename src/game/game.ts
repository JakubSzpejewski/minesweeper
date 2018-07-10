import { Board } from "./board/board";

export enum GameState {
    running,
    won,
    lost,
}

export class Game {

    constructor(
        public board: Board,
        public state: GameState,
    ) {

    }


    public checkGameOver(): boolean {
        if (this.state !== GameState.running) {
            return true;
        }
        const tiles = this.board.board.reduce((acc, v) => acc.concat(v), []);
        if (tiles.some(tile => tile.revealed && tile.isBomb)) {
            this.board.revealBoard();
            this.state = GameState.lost;
            return true;
        }

        if ((tiles.filter(tile => tile.revealed).length) === tiles.length - this.board.bombCount) {
            this.board.revealBoard();
            this.state = GameState.won;
            return true;
        }
        return false;
    }
}
