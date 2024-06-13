<template>
  <div class="center-part-container">
    <div class="center-title__content">
      <div
        class="img-text-container"
        :class="{ active: activeName === item.name }"
        v-for="item in resultData1"
        :key="item.name"
        @click="openDialog(item)"
      >
        <p />
        <div class="text-wrapper">
          <span>{{ item.name }}</span>
          <span>{{ item.value === null ? "-" : item.value }}</span>
        </div>
      </div>
    </div>

    <!-- 动画区 -->
    <div class="animation-wrapper">
      <div class="items-wrapper">
        <div>
          <div class="item">
            <div>
              <span>运行风险指数</span>
              <span>{{ 123 }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <div>
              <span>车辆风险指数</span><span>{{ 456 }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <div>
              <span>时间风险指数</span><span> {{ 789 }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <div>
              <span>驾驶风险指数</span><span> {{ 10 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.center-part-container {
  .animation-wrapper {
    margin-top: 60px;
    width: 100%;
    height: 600px;
    position: relative;

    perspective: 1000px; // 每个模块添加空间效果。

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .items-wrapper {
      position: absolute;
      bottom: 150px;
      left: calc(50% - 150px);
      z-index: 2;
      // height: 100px;
      // width: 100px;

      width: 300px;
      height: 300px;

      transform: rotateX(-15deg) translate3d(0, 120px, -300px);
      transform-style: preserve-3d; /* 保留3D变换 */

      animation: rotateAnimation linear infinite 10s;

      &:hover {
        animation-play-state: paused;
        .item {
          animation-play-state: paused !important;
        }
      }

      > div {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        line-height: 100px;
        text-align: center;
        border-radius: 50%;
        font-size: 20px;
        background: none;

        position: absolute;
        box-sizing: border-box;

        perspective: 1000px; // 每个模块添加空间效果。
        transform-style: preserve-3d; /* 保留3D变换 */

        // 单独对1,2字体翻转。
        &:nth-of-type(1),
        &:nth-of-type(2) {
          .item {
            > div {
              transform: rotateY(180deg) !important;
            }
          }
        }

        @for $i from 1 through 4 {
          &:nth-of-type(#{$i}) {
            --initDeg: #{$i * 90}deg;
            transform: rotateY(var(--initDeg)) translateZ(400px);
            > div.item {
              width: 300px;
              height: 250px;
              background-color: green;
              background-size: 98px 120px;

              display: flex;
              flex-wrap: nowrap;
              justify-content: center;

              $rotate: 0deg;
              @if $i == 1 or $i == 3 {
                $rotate: -90deg;
              }
              --rotate: #{$rotate};
              transform: rotateY(-$rotate);
              animation: rotateAnimation2 linear infinite 10s reverse;

              > div {
                > span {
                  &:nth-of-type(1) {
                    font-size: 18px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    font-style: italic;
                    color: #ffffff;
                    line-height: 56px;
                    text-shadow: 0px 3px 6px rgba(107, 255, 142, 0.64);
                    margin-right: 20px;
                  }

                  &:nth-of-type(2) {
                    font-size: 30px;
                    font-family: DIN;
                    font-weight: bold;
                    font-style: italic;
                    color: #ffffff;
                    text-shadow: 0px 3px 6px rgba(107, 255, 142, 0.64);
                    padding-right: 10px;

                    background: linear-gradient(
                      0deg,
                      rgba(107, 255, 142, 0.64) 0%,
                      rgba(155, 255, 169, 0.64) 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .dialog {
    position: fixed;
    top: -140px;
    // left: -125px;
    z-index: 1000;
    height: 800px;
    display: none;

    width: 1920px;
    height: 1080px;
    padding-top: 225px;
    background-color: rgb(2, 8, 39, 0.7);

    &.visibility {
      display: block;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :deep(.monitor-center__list) {
    width: 100% !important;
    height: 100% !important;
    background-color: #020827 !important;
    opacity: 0.7;
    .el-dialog__body {
      display: flex !important;
      justify-content: center !important;
    }
  }
}

@keyframes rotateAnimation2 {
  100% {
    transform: rotateY(calc(360deg - var(--rotate, 0deg)));
  }
}

@keyframes rotateAnimation {
  to {
    transform: rotateX(-15deg) translate3d(0, 120px, -300px) rotateY(360deg);
  }
}
</style>
