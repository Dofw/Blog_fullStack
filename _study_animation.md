[TOC]

## 动画笔记

- 本质: 一个状态到另一个状态的变化。

- 贝塞尔曲线
- 同步,强行渲染

### Js 动画相关 Api 详见 MDN

1. element.animate(keyframes, options) **同 css animation 动画**

- 详细见
- 这种方式是创建一个新的对象实例, 不影响原生设置的动画变化, 不改变 style 的属性, 不会导致重绘？待看官方文档。

2. element.getAnimations() 包含所有的动画对象。

3. window.IntersectionObserver **监听元素进入和离开视口相关的实践方案**

- 监听一个元素进入视口，可以解决滚动加载、进入视口的一些实践问题。

### Js 控制 style 方案、Js 控制 class 方案**常用的解决方案，js 控制类，css 负责动画**

- style 方案: 处理比较复杂的状态变化，通过 js 灵活处理坐标系关系的方式实现。
- class 方案: 较为简单状态变化, 利用 Css 的过度动画实现。

### 贝赛尔曲线实现方案 **制作更复杂动画的方案**

```js
// 变量不是属性，css是改变属性才能实现动画。
// animation 里面不能更改变量，实现动画。
// css里面hounidi api
@property --x{
  syntax: '<length>';
  initial-value: 0px;
  inherits: false;
}

.box{
  --x: 0px; // 这里--x的含义，为上面的@property定义为属性了。
}

// 贝塞尔曲线 处处可导，四个控制点，css中00.11固定。
横坐标：时间函数，0-1(通用性)时间内  。
纵坐标：距离的变化0-1，在实际情况中根据具体在 纵坐标上做缩放。

cubic-bezier(x1,y1,x2,y2)

```

### 通过 Css 变量**Css 动画 延迟技巧, 实现更加复杂的动画效果**

移动时间轴,通过动画延迟来实现; js 控制--delay

变量优点: 每一个位置的动画状态让浏览器帮我们计算, 不需要 js 处理复杂的计算过程。

```js
  // js 控制--delay
  --delay = -1s // 就是动画结束状态。

  // css 设置暂停属性 paused。通过js控制时间轴即延迟来改变位置。
  .box{
    --delay
    animation: move 1s var(--delay) linear forwards paused
  }

  // 定义复杂的css状态
  @keyframe move{
    0%{
      clip-path: polygon(0px 70%, 100% 100%)
      opacity:0
    }

    100%{
      clip-path: polygon(100% 50%, 50% 50%)
      opacity:1
    }
  }

```

## 动画实践

**钉钉官网实践**: 确定动画区域, 利用粘性定位。
