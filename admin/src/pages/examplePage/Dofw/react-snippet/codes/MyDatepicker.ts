export const code = `
/**
 * 使用配置
 * const dateDefault = { type: 'year', value: preYear }
 * const selectListRef = [{ name: '季度', type: 'quarter', range: true }]
 * const formatOption = { year: 'YYYY' }
 * const disabledFuncOption = {year: (current) => {...}}
 * 
 * /

<script>
import React, { useState, useMemo, useRef } from 'react';
import { Select, DatePicker, Space } from 'antd';
import moment from 'moment';
import style from './myDatePicker.less';
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function MyDatePicker(props) {
  const {
    selectList = [],
    formatOption = {},
    disabledFuncOption = {},
    onChange,
    dateDefault,
    styles,
    customHint,
  } = props;

  // 1.类型提示文字
  const hintTextDefault = {
    year: '(截至本年累计值)',
    month: '(截至本月累计值)',
    quarter: '(截至本季累计值)',
  };
  const hintText = useMemo(() => {
    return customHint ? customHint : hintTextDefault;
  }, [customHint]);

  // 2.selectList 没传入，使其 select 显示年度 与 picker 类型相对应。
  const defaultSelect2Type = {
    selectDefault: 'year',
    typeDefault: 'year',
  };
  const initTypeDate =
    selectList && selectList[0] ? selectList[0].type : defaultSelect2Type.typeDefault;
  const initSelectDefualt =
    selectList && selectList[0] ? selectList[0].type : defaultSelect2Type.selectDefault;

  // select / dateType state
  const [typeDate, setTypeDate] = useState(initTypeDate);
  const [typeSelect, setSelector] = useState(initSelectDefualt);

  // 3.格式
  const format = useMemo(() => {
    const format = formatOption[typeDate];
    return format ? format : '';
  }, [typeDate]);

  // 3.1是否为range类型
  const isRange = useMemo(() => {
    const selectItem = selectList.find(item => {
      return item.type === typeSelect;
    });

    return selectItem.range;
  }, [typeSelect]);

  // 4.时间值 和 placeholder
  const placeholderRef = useRef('请选择时间'); //value为null，显示它。
  const [pickerValue, setPickerValue] = useState(null); //moment格式。

  /**
   * 计算 valueDefault 季度需要装换一下。
   * 根据默认类型时间，设置setPicerValue、设置日期setTypeDate、设置setSelector。该值只因父组件变化而变。重置使用。
   */
  useMemo(() => {
    if (!dateDefault) {
      return null;
    }
    initDefault(selectList, dateDefault);
  }, [dateDefault, selectList]);

  // 5.记录 onPickChange 输出的 普通值(用于抛出给父组件)、moment格式值(用于设置input的value值即setPickerValue)。
  const [isOpen, setOpen] = useState(false);
  const [selectDate, setSelectDate] = useState(null);
  const [pickerMoment, setPickerMoment] = useState(null);
  const onPickChange = (moment, value) => {
    // 这里仅仅在内部保存选中日期
    setSelectDate(value);
    // 保存对应的moment，确定后展示在input里。
    setPickerMoment(moment);
  };

  const handOK = () => {
    if (typeof onChange === 'function') {
      if (selectDate !== null) {
        setPickerValue(pickerMoment);
        console.log(selectDate, pickerMoment, { type: typeDate, value: selectDate });
        onChange({ type: typeDate, value: selectDate });
      }
    }
    setOpen(false);
  };

  const onCancel = () => {
    // 恢复默认状态
    if (typeof onChange === 'function') {
      //更新dataPiker组件，dateDefault 查找其对应的type
      initDefault(selectList, dateDefault);
      onChange(dateDefault, 'cancle'); // 父级默认{type：year; value: 2xxx}
      setOpen(false);
    }
  };

  const onSelectChange = (value, options) => {
    setSelector(value);
    //切换type
    setTypeDate(value);
    //setPickValue 为 null，使其展示placeholder的值。
    setPickerValue(null);
  };

  // 6.控制时间的禁用区域
  const disabledFunc = useMemo(() => {
    return disabledFuncOption[typeDate];
  }, [typeDate, disabledFuncOption]);

  const disabledDate = current => {
    if (typeof disabledFunc === 'function') {
      return disabledFunc(current);
    }
    return;
  };

  /**
   * Tool 设置默认值
   *
   * 1.使用位置
   * 初始、onCancel
   * 2.条件
   * 用户传入的List里必须要有defaultValue对应的值。否则属于配置错误抛出。
   * 3.功能
   * setTypeDate、setSelector、setPickerValue
   */
  function initDefault(userSelectList, defaultValue) {
    const typesArr = userSelectList.map(item => {
      return item.type;
    });
    if (typesArr.indexOf(defaultValue.type) === -1) {
      throw '默认值对应的时间类型,不在select配置中!!!';
    }

    userSelectList.forEach(item => {
      if (item.type === defaultValue.type) {
        setTypeDate(defaultValue.type);
        setSelector(item.type);

        try {
          setPickerValue(moment(defaultValue.value));
        } catch (error) {
          console.warn(error);
        }
      }
    });
  }

</script>


  return (
    <div className={style.myDatePicker} style={styles}>
      <Select
        size="large"
        value={typeSelect}
        disabled={Select.length ? true : false}
        onChange={onSelectChange}
        getPopupContainer={triggerNode => {
          let parentNode = triggerNode.parentNode;
          return parentNode;
        }}
      >
        {selectList.map((item, index) => {
          return (
            <Option key={item.type} value={item.type}>
              {item.name}
            </Option>
          );
        })}
      </Select>

      <Space>
        {isRange ? (
          <RangePicker
            size="large"
            allowClear
            className={style.myRangePicker}
            style={{ color: 'green !important', fontSize: '22px !important' }}
            inputReadOnly={true}
            showTime
            picker={typeDate}
            format={format}
            placeholder={placeholderRef.current}
            value={pickerValue}
            onChange={onPickChange}
            open={isOpen}
            disabledDate={disabledDate}
            getPopupContainer={triggerNode => {
              let parentNode = triggerNode.parentNode;
              parentNode.style.position = 'relative';
              return parentNode;
            }}
            renderExtraFooter={() => (
              <div className={style.timeFooterBtnWrap}>
                <div onClick={onCancel} className={style.timeFooterBtn}>
                  重置
                </div>
                <div onClick={handOK} className={style.timeFooterBtn}>
                  确认
                </div>
              </div>
            )}
            onClick={() => {
              setOpen(true);
            }}
            onBlur={() => {
              setOpen(false);
            }}
          ></RangePicker>
        ) : (
          <DatePicker
            size="large"
            allowClear
            className={style.myPicker}
            style={{ color: 'green !important', fontSize: '22px !important' }}
            inputReadOnly={true}
            showTime
            picker={typeDate}
            format={format}
            placeholder={placeholderRef.current}
            value={pickerValue}
            onChange={onPickChange}
            open={isOpen}
            disabledDate={disabledDate}
            getPopupContainer={triggerNode => {
              let parentNode = triggerNode.parentNode;
              parentNode.style.position = 'relative';
              return parentNode;
            }}
            renderExtraFooter={() => (
              <div className={style.timeFooterBtnWrap}>
                <div onClick={onCancel} className={style.timeFooterBtn}>
                  重置
                </div>
                <div onClick={handOK} className={style.timeFooterBtn}>
                  确认
                </div>
              </div>
            )}
            onClick={() => {
              setOpen(true);
            }}
            onBlur={e => {
              setOpen(false);
            }}
          ></DatePicker>
        )}
      </Space>

      {/* hint */}
      <div className={style.hintText}>{hintText[typeDate] ? hintText[typeDate] : ''}</div>
    </div>
  );
}


`
