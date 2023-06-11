export const code = `

<script>
import React, { useMemo } from 'react';
import Slider from 'react-slick';
import style from './common-slider.less';
import classnames from 'classnames';
import { defaultValue } from '.';

const defaultSliderOption = {
  slidesToScroll: 1,
  slidesToShow: 4,
  verticalSwiping: true,
  vertical: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

/**
 * titleOption: {
 *  name: title 的lable说明。
 *  field: data数据中需要展示的 字段key。
 *  fieldDefaultVal: field 对应值为undeined、null时展示的字符串，默认 '-'。
 *  numFormat: 数据转换方式，见defaultValue函数。
 *  unit: 需要展示的单位。默认 ''
 *  width: 控制每个列的宽度。默认200px
 * }
 * sliderOption: slider组件的配置。默认见上。
 * itemClassName: 设置每项 div的class, 进一步设置>span
 * titleClassName: 设置标题 div的class, 进一步设置>span
 * footerClassName: 设置footer div的class, 进一步设置>span
 * data 数据。
 *
 */

function CommonSlider(props) {
  let {
    titleOption = [],
    sliderOption = {},
    itemClassName,
    titleClassName,
    footerClassName,
    data = [],
    totalItem = {},
    isShowTotal = false,
  } = props;

  const newSliderOption = useMemo(() => {
    return { ...defaultSliderOption, ...sliderOption };
  }, [sliderOption]);

  // title
  // title - item - footer: default width 200
  const defaultWidth = 200;
  const reanderItemTitle = item => {
    const width = item.width || defaultWidth + 'px';
    return (
      <span style={{ width }} key={item.field}>
        {item.name}
      </span>
    );
  };

  // item
  const renderItemPro = (item, idx) => {
    return (
      <div
        className={classnames(style.itemWrapper, itemClassName, {
          [style.even]: idx % 2 === 0,
          [style.odd]: idx % 2 !== 0,
        })}
        key={idx}
      >
        {titleOption.map((option, index) => {
          const value = item[option.field];
          const defaultVal = option.fieldDefaultVal;
          const format = option.format;

          const unit = option.unit || '';
          const width = option.width || defaultWidth + 'px';

          // 序号特殊
          if (option.field === 'index') {
            return (
              <span key={idx + index + ''} style={{ width }}>
                {idx + 1}
              </span>
            );
          }

          // 其他
          return (
            <span key={idx + index + ''} style={{ width }} title={value}>
              {\`\${defaultValue(value, defaultVal, format)}\${unit}\`}
            </span>
          );
        })}
      </div>
    );
  };

  //footer
  const reanderItemFooter = (item, index) => {
    let value, defaultVal, format, unit, width;
    // 样式all同步
    width = item.width || defaultWidth + 'px';

    // 展示 totalItem 标记的字段
    if (totalItem[item.field]) {
      defaultVal = item.fieldDefaultVal;
      format = item.format;

      unit = item.unit || '';
      value = defaultValue(totalItem[item.field], defaultVal, format);
    } else {
      // 无标记的,默认空。
      value = '';
      unit = '';
    }

    return (
      <span key={index} style={{ width }} title={value}>
        {\`\${value}\${unit}\`}
      </span>
    );
  };

  return (
    <div className={style.sliderContainer}>
      <div className={[style.title, titleClassName].join(' ')}>
        {titleOption.map(reanderItemTitle)}
      </div>
      <div className={style.wrapper}>
        {data?.length > newSliderOption.slidesToShow ? (
          <Slider className={style.bbsSlider} {...newSliderOption}>
            {data?.map(renderItemPro)}
          </Slider>
        ) : (
          data?.map(renderItemPro)
        )}
      </div>
      {isShowTotal ? (
        <div className={[style.footer, footerClassName].join(' ')}>
          {titleOption.map(reanderItemFooter)}
        </div>
      ) : null}
    </div>
  );
}

export default CommonSlider;
</script>
`
