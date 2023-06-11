export const code = `
<style>
.sliderContainer {
  @border: 1px solid green;

  width: 100%;
  height: 100%;

  @commonHeight: 45px;
  @marginLeft: 20px; // title/item span间距

  // less 语法, 文字超出宽度则显示ellipsis省略号
  .overflow-snippet {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: text;
  }
  // less 语法 title footer item Span 元素共同属性。
  .titleFooterItemSpanCommon {
    display: inline-block;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #d9eeff;
    .overflow-snippet();
  }

  .title {
    height: @commonHeight;
    background-color: #0d427e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 21px;
    letter-spacing: 3px;
    color: #61c1fe;

    > span {
      .titleFooterItemSpanCommon();

      font-weight: bold;
      color: #61c1fe;

      &:not(:nth-of-type(1)) {
        margin-left: @marginLeft;
      }
      // &:nth-of-type(1) {
      // }
      // &:nth-of-type(2) {
      // }
      // &:nth-of-type(3) {
      // }
      // &:nth-of-type(4) {
      // }
      // &:nth-of-type(5) {
      // }
      // &:nth-of-type(6) {
      // };
    }
  }

  .wrapper {
    height: auto;
    overflow: hidden;

    // 每一项
    .itemWrapper {
      width: 100%;
      height: @commonHeight;
      display: flex !important;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      font-size: 20px;

      &.even {
        background-color: #182044;
      }

      &.odd {
        background-color: #0c3064;
      }

      > span {
        .titleFooterItemSpanCommon();

        &:not(:nth-of-type(1)) {
          margin-left: @marginLeft;
        }

        &:nth-of-type(1) {
          text-align: center;
        }
        // &:nth-of-type(2) {
        //   width: 240px;
        // }
        // &:nth-of-type(3) {
        //   width: 150px;
        // }
        // &:nth-of-type(4) {
        //   width: auto;
        // }
        // &:nth-of-type(5) {
        //   width: 100px;
        // }
        // &:nth-of-type(6) {
        //   width: 80px;
        // }
      }
    }

    .bbsSlider {
      width: 100%;
      height: auto;

      :global {
        .slick-arrow {
          display: none !important;
        }
      }

      .itemWrapper {
        .itemWrapper();
      }
    }
  }

  .footer {
    height: @commonHeight;
    background-color: rgba(255, 190, 0, 0.2);

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 21px;
    letter-spacing: 3px;
    color: #61c1fe;

    > span {
      .titleFooterItemSpanCommon();

      &:not(:nth-of-type(1)) {
        margin-left: @marginLeft;
      }
      &:nth-of-type(1) {
      }
      &:nth-of-type(2) {
        color: #ffbe00;
      }
      // &:nth-of-type(3) {
      // }
      // &:nth-of-type(4) {
      // }
      &:nth-of-type(5) {
        color: #ffbe00;
      }
      // &:nth-of-type(6) {
      // };
    }
  }
}
</style>

`
