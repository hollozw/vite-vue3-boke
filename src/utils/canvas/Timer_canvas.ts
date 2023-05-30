import Canvas from "@/utils/canvas/index";
class Timer extends Canvas {
  constructor(id: any, fill: any) {
    super(id, fill);
    setInterval(() => {
      this.context.clearRect(0, 0, 300, 300);
      this.update();
    }, 1000);
  }

  /**
   * 先绘制钟的整体白色底盘：
   */
  drawPanel() {
    const ctx = this.context;
    ctx.translate(150, 150);
    // 开始绘制
    ctx.beginPath();
    // 画一个圆
    ctx.arc(0, 0, 130, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  /**
   * 绘制时钟的12位数字：
   */
  hourNum() {
    const ctx = this.context;
    // 存放12个数字
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    ctx.beginPath();
    // 数字的基本样式
    ctx.font = "30px fangsong";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    for (var i = 0; i < arr.length; i++) {
      ctx.fillText(
        arr[i],
        108 * Math.cos(((i * 30 - 60) * Math.PI) / 180),
        108 * Math.sin(((i * 30 - 60) * Math.PI) / 180)
      );
    }
  }

  /**
   * 绘制时钟中心的圆点
   */
  centerDot() {
    const ctx = this.context;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * 绘制时针：
   * @param:hours为当前时间的小时，minutes为当前时间的分钟
   */
  hourHand(hours, minutes) {
    const ctx = this.context;
    // 应该旋转的角度，默认时钟为指向12点方向。
    var radius =
      ((2 * Math.PI) / 12) * hours + (((1 / 6) * Math.PI) / 60) * minutes;
    // 保存当前状态，为了旋转后能回到当初状态。
    ctx.save();
    ctx.beginPath();
    // 针的宽度
    ctx.lineWidth = 5;
    // 针头为圆角
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    // 旋转
    ctx.rotate(radius);
    // 画一条线表示时钟
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -50);
    ctx.stroke();
    // 回到保存的状态
    ctx.restore();
  }

  /**
   * 绘制分针
   */
  minuteHand(minutes) {
    const ctx = this.context;
    2 * Math.PI;
    var radius = ((2 * Math.PI) / 60) * minutes;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.rotate(radius);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -70);
    ctx.stroke();
    ctx.restore();
  }
  /**
   * 绘制秒针
   */
  secondHand(seconds) {
    const ctx = this.context;
    var radius = ((2 * Math.PI) / 60) * seconds;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.strokeStyle = "red";
    ctx.rotate(radius);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -90);
    ctx.stroke();
    ctx.restore();
  }
  /**
   * 当前时间
   */

  update() {
    const ctx = this.context;
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    // 保存canvas状态，因为绘制底盘时它偏移了
    ctx.save();
    this.drawPanel();
    this.hourNum();
    this.secondHand(seconds);
    this.minuteHand(minutes);
    this.hourHand(hours, minutes);
    this.centerDot();
    // 恢复canvas状态
    ctx.restore();
  }
}

export default Timer;
