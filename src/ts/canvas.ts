import { toRadians } from './utils/angle';

export class Canvas {
  private static instance: Canvas;

  private readonly element: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private constructor() {
    this.element = document.querySelector('canvas')!;
    this.context = this.element.getContext('2d')!;

    this.resizeElement();
    window.addEventListener('resize', this.resizeElement.bind(this));
  }

  private resizeElement() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

  static init(): Canvas {
    Canvas.instance = new Canvas();
    return Canvas.instance;
  }

  static get element(): HTMLCanvasElement {
    return Canvas.instance.element;
  }

  static get context(): CanvasRenderingContext2D {
    return Canvas.instance.context;
  }

  static get width(): number {
    return Canvas.element.width;
  }

  static get height(): number {
    return Canvas.element.height;
  }

  static clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }

  static drawCircle(
    x: number,
    y: number,
    r: number,
    fill = 'black',
    stroke = 'black',
    strokeWidth = 0
  ) {
    const c = Canvas.context;
    c.save();
    c.fillStyle = fill;
    c.strokeStyle = stroke;
    c.lineWidth = strokeWidth;
    c.beginPath();
    c.arc(x, y, r, 0, toRadians(360));
    c.fill();
    if (strokeWidth > 0) c.stroke();
    c.restore();
  }

  static drawRectangle(
    x: number,
    y: number,
    w: number,
    h: number,
    fill = 'black',
    stroke = 'black',
    strokeWidth = 0
  ) {
    const c = Canvas.context;
    c.save();
    c.fillStyle = fill;
    c.strokeStyle = stroke;
    c.lineWidth = strokeWidth;
    c.fillRect(x, y, w, h);
    if (strokeWidth > 0) c.strokeRect(x, y, w, h);
    c.restore();
  }

  static drawImage(
    x: number,
    y: number,
    w: number,
    h: number,
    image: HTMLImageElement
  ) {
    Canvas.context.drawImage(image, x, y, w, h);
  }
}

Canvas.init();
