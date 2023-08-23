import type { Ref } from "vue"

// 面向对象的变成体验
interface BallOption {
  radius: number
  x: number
  y: number
  dx: number
  dy: number
  mass: number
  color: string
}

interface BallInstance extends BallOption {
  draw: () => void
  update: () => void
}

export default function collision(domRef: Ref<HTMLCanvasElement>) {
  const canvas: HTMLCanvasElement = domRef.value
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D

  // 这里造成重新渲染, 后期研究
  // const rectData = canvas.getBoundingClientRect()
  // canvas.width = Math.floor(rectData.width)
  // canvas.height = Math.floor(rectData.height)

  const allBalls: BallInstance[] = []
  const num = 20
  const colors = ["#67C23A", "#E6A23C", "#F56C6C", "#409EFF"]

  // 小球模型
  class Ball implements BallInstance {
    radius = 0
    x = 0
    y = 0
    dx = 0
    dy = 0
    mass = 0
    color = "#fff"

    constructor(option: BallOption) {
      this.radius = option.radius
      this.x = option.x
      this.y = option.y
      this.dx = option.dx
      this.dy = option.dy
      this.mass = option.mass
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
      // 碰撞检查
      for (let i = 0; i < allBalls.length; i++) {
        const element = allBalls[i]
        if (this === element) continue
        if (this.radius + element.radius >= sapceBall(this.x, this.y, element.x, element.y)) {
          // 如何判断，小球是否靠近，  // 通过向量图解分析的，30.02时间段。
          const vX = element.dx - this.dx
          const vY = element.dy - this.dy
          const spaceX = element.x - this.x
          const spaceY = element.y - this.y

          if (vX * spaceX + vY * spaceY < 0) {
            checkCallision(this, element)
          }
        }
      }

      // 墙面临界值
      if (this.x < this.radius || this.x > canvas.width - this.radius) {
        this.dx = -this.dx
      }
      if (this.y < this.radius || this.y > canvas.height - this.radius) {
        this.dy = -this.dy
      }

      this.x += this.dx
      this.y += this.dy

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
    requestAnimationFrame(animation)
  }

  /**
   * 初始化所有小球
   */
  function init() {
    for (let i = 0; i < num; i++) {
      const radius = _random(10) + 10

      const option: BallOption = {
        radius,
        x: _randomRange(canvas.width, radius),
        y: _randomRange(canvas.height, radius),

        dx: _random(2),
        dy: _random(2),
        mass: radius * 0.5,
        color: colors[i % colors.length]
      }

      // 重叠，就更新参数
      for (let j = 0; j < allBalls.length; j++) {
        const element = allBalls[j]
        if (doublication(option.x, option.y, option.radius, element.x, element.y, element.radius)) {
          // 重复，在重新生成
          const newRadius = _random(10) + 10
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
 * 计算小球间距是否碰撞
 * @param x
 * @param y
 * @param radius
 * @param x1
 * @param y1
 * @param radius1
 * @returns
 */
function doublication(
  x: number,
  y: number,
  radius: number,
  x1: number,
  y1: number,
  radius1: number
) {
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

function sapceBall(x: number, y: number, x1: number, y1: number) {
  const dx = x - x1
  const dy = y - y1
  const space = Math.sqrt(dx * dx + dy * dy)
  return space
}

/**
 * 碰撞检查
 */
function checkCallision(p1: BallInstance, p2: BallInstance) {
  const theta = -Math.atan2(p1.y - p2.y, p1.x - p2.x)

  //计算碰撞角度到x轴方向
  const rotate1 = rotate(p1.dx, p1.dy, theta)
  const rotate2 = rotate(p2.dx, p2.dy, theta)

  //完全弹性碰撞公式
  const collision1 = {
    dx: (rotate1.dx * (p1.mass - p2.mass) + 2 * p2.mass * rotate2.dx) / (p1.mass + p2.mass),
    dy: rotate1.dy
  }
  const collision2 = {
    dx: (rotate2.dx * (p2.mass - p1.mass) + 2 * p1.mass * rotate1.dx) / (p1.mass + p2.mass),
    dy: rotate2.dy
  }

  //旋转回原来x轴坐标
  const afterCollisionV1 = rotate(collision1.dx, collision1.dy, -theta)
  const afterCollisionV2 = rotate(collision2.dx, collision2.dy, -theta)

  p1.dx = afterCollisionV1.dx
  p1.dy = afterCollisionV1.dy
  p2.dx = afterCollisionV2.dx
  p2.dy = afterCollisionV2.dy
}

/**
 * 旋转速度向量，返回选装后的坐标轴数值
 */
function rotate(dx: number, dy: number, theta: number) {
  // 数学知识, 计算旋转后点的坐标
  return {
    dx: dx * Math.cos(theta) - dy * Math.sin(theta),
    dy: dy * Math.cos(theta) + dx * Math.sin(theta)
  }
}
