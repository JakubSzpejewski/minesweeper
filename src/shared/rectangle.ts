import { Box, Vector2 } from "./utils";

export class Rectangle {
    public x: number
    public y: number
    public width: number
    public height: number

    public right: number;
    public bottom: number;

    public middle: Vector2;

    constructor(
        box: Box
    ) {
        this.x = box.x;
        this.y = box.y;
        this.width = box.width;
        this.height = box.height;
        this.middle = {
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2),
        }

        this.right = box.x + box.width;
        this.bottom = box.y + box.height;
    }

}