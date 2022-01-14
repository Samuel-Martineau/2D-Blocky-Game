export class Color {
  constructor(
    public h: number,
    public s: number,
    public l: number,
    public o: number = 1
  ) {}

  public rotate(angle: number) {
    return new Color(this.h + angle, this.s, this.l, this.o);
  }

  toString() {
    return `hsl(${this.h},${this.s}%,${this.l}%,${this.o})`;
  }
}
