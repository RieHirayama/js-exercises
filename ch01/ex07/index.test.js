import { Point} from './Point.js';

let p1 = new Point(3, 4);
let p2 = new Point(5, 6);

describe("Point test", () => {
    describe("distance", () => {
        it("returns the result of the distance value", () => {
            expect(p1.distance()).toBe(5);
        });
    })

    describe("add", () => {
        it("returns the result of the addition", () => {
            expect(p1.add(p2)).toStrictEqual(new Point(8, 10));
        });
    })
})