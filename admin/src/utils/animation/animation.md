[TOC]

## 动画笔记

- 本质: 一个状态到另一个状态的变化。

- 贝塞尔曲线
- 同步,强行渲染

### 贝赛尔曲线实现方案

### Js 动画

### xxx

### **Css 动画 延迟技巧, 实现更加复杂的动画效果**

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
