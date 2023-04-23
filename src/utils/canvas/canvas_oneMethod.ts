import Canvas from ".";
import { deepClone } from "../deep_code";

interface IOption_Cicly {
  position: Array<Array<number>>; // 小球初始出现的位置
  size?: number;
  max_x_v: number;
  max_y_v: number;
  numbers: number;
}

class Canvas_cicly_Round {
  public canvas: Canvas;
  public x_y_v: Array<number>;
  public position: Array<number>;
  public color: string;
  public Cicly_options: any; // 动态全部小球数据
  constructor(id: string, fill: boolean | string, options: IOption_Cicly) {
    this.canvas = new Canvas(id, fill);
    this.color = `rgb(${this.canvas.getRandomInt(
      1,
      255
    )}, ${this.canvas.getRandomInt(1, 255)}, ${this.canvas.getRandomInt(
      1,
      255
    )})`;
    if (options.numbers > 0) {
      let a: Array<positionData> = [];
      for (let i = 0; i < options.numbers; i++) {
        a[i] = new positionData(
          options.max_x_v,
          options.max_y_v,
          options.size,
          options.position
        );
      }
      this.Cicly_options = a;
    }
    this.Cicly_create();
  }

  // 创建小球
  Cicly_create() {
    if (this.Cicly_options.length) {
      this.Cicly_options.forEach((item, index) => {
        this.canvas.context.beginPath();
        this.canvas.context.arc(
          item.position[0],
          item.position[1],
          item.size,
          0,
          Math.PI * 2,
          true
        );
        this.canvas.context.closePath();
        this.canvas.context.fillStyle = item.color;
        this.canvas.context.fill();
      });
    }
  }

  // 小球位置
  Cicly_position() {
    const extend: Array<number> = [this.canvas.width, this.canvas.height];
    if (this.Cicly_options.length) {
      const new_Cicly_options = this.Cicly_options.map((item, indexs) => {
        const a = item.x_y_v.map((items, index) => {
          let speed = items;
          let new_position;
          if (
            item.position[index] >= extend[index] - item.size ||
            item.position[index] <= item.size
          ) {
            speed = -items;
          }
          new_position = item.position[index] + speed;
          return { x_y_v: speed, position: new_position };
        });
        return {
          x_y_v: [a[0].x_y_v, a[1].x_y_v],
          position: [a[0].position, a[1].position],
          size: item.size,
          color: item.color,
        };
      });
      this.Cicly_options = new_Cicly_options;
    }
  }

  // 启动小球
  Cicly_action() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.Cicly_create();
    this.Cicly_position();
  }
}

class positionData {
  public x_y_v: Array<number>; // 移动速度
  public color: string; // 颜色
  public position: Array<number>; // 出现范围
  public size: number; // 尺寸
  constructor(
    x_max_v: number,
    y_max_v: number,
    size: number = 20,
    position?: Array<Array<number>>
  ) {
    this.x_y_v = [this.getRandomInt(1, x_max_v), this.getRandomInt(1, y_max_v)];
    this.color = `rgb(${this.getRandomInt(1, 255)}, ${this.getRandomInt(
      1,
      255
    )}, ${this.getRandomInt(1, 255)})`;
    this.size = size || 20;
    if (position[0][0] < size) {
      this.position = [
        this.getRandomInt(size, position[0][1]),
        this.getRandomInt(size, position[1][1]),
      ];
    } else {
      this.position = [
        this.getRandomInt(position[0][0], position[0][1]),
        this.getRandomInt(position[1][0], position[1][1]),
      ];
    }
  }

  getRandomInt(min: number = 15, max: number = 15) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
}

export default Canvas_cicly_Round;
