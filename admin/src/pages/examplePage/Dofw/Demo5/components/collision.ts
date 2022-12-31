// 面向对象的变成体验
interface BallOption {
  radius: number
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

interface BallInstance extends BallOption {
  draw: () => void
  update: () => void
}

export default function collision() {
  const canvas: HTMLCanvasElement = document.getElementById("canvas-instance3") as HTMLCanvasElement
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D

  const allBalls: BallInstance[] = []
  const num = 100
  const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#409EFF"]

  // 小球模型
  class Ball implements BallInstance {
    radius = 0
    x = 0
    y = 0
    dx = 0
    dy = 0
    color = "#fff"

    constructor(option: BallOption) {
      this.radius = option.radius
      this.x = option.x
      this.y = option.y
      this.dx = option.dx
      this.dy = option.dy
      this.color = option.color
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }

    update() {
      const dx = this.dx
      const dy = this.dy

      this.x += dx
      this.y += dy

      // 墙面临界值
      if (this.x < this.radius || this.x > canvas.width - this.radius) {
        this.dx = -dx
      }
      if (this.y < this.radius || this.y > canvas.height - this.radius) {
        this.dy = -dy
      }
      this.draw()
    }
  }

  init()
  animation()

  /**
   * 启动动画
   */
  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < allBalls.length; i++) {
      const ballInstance = allBalls[i]

      ballInstance.update()
    }
    // requestAnimationFrame(animation)
  }

  /**
   * 初始化所有小球
   */
  function init() {
    for (let i = 0; i < num; i++) {
      const radius = _random(30)

      const option: BallOption = {
        radius,
        x: _randomRange(canvas.width, radius),
        y: _randomRange(canvas.height, radius),

        dx: _random(5),
        dy: _random(5),
        color: colors[i % colors.length]
      }

      // 重叠，就更新参数
      for (let j = 0; j < allBalls.length; j++) {
        const element = allBalls[j]
        if (doublication(option.x, option.y, option.radius, element.x, element.y, element.radius)) {
          // 重复，在重新生成
          const newRadius = _random(30)
          option.radius = newRadius
          option.x = _randomRange(canvas.width, newRadius)
          option.y = _randomRange(canvas.height, newRadius)

          j = -1
        }
      }

      allBalls.push(new Ball(option))
    }
  }
}

/**工具函数，不存在依赖其他上下文 */

/**
 * 0 ~ num
 * @param num
 * @returns
 */
function _random(num: number) {
  return Math.random() * num
}

/**
 * 0 ~ num
 * @param num
 * @returns
 */
function _randomRange(num: number, padding: number) {
  return _random(num - 2 * padding) + padding
}

/**
 * 小球的间距
 * @param ball
 * @param ball1
 */
function doublication(x: number, y: number, radius: number, x1: number, y1: number, radius1: number) {
  const dx = x - x1
  const dy = y - y1
  const space = Math.sqrt(dx * dx + dy * dy)
  const spaceRadius = Math.abs(radius + radius1)

  if (space < spaceRadius) {
    return true
  } else {
    return false
  }
}
