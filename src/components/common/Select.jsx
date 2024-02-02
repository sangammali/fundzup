import React from "react";
import MNativeSelect from "@mui/material/NativeSelect";

const Select = (props) => {
  const {
    label,
    data = [],
    dataKey = "key",
    dataValue = "value",
    value,
    defaultValue,
    multiple = 0,
    onChange = () => { },
    disabled = false,
    makeOptionsCenterAlign = false,
    ...restProps
  } = props;

  let list = data || [];

  if (list.constructor === Object) {
    list = list[1] || [];
  }

  if (list.constructor === Array) {
    let isListValid = list[0] && list[0].constructor === Object;
    list = isListValid
      ? list
      : list.map((l) => ({ key: l.toString(), value: l.toString() }));
  }

  
  const onChangeInside = (e) => {
    console.log("Select value => ", e.target.value);
    onChange(e.target.value);
  };

  return (
    <MNativeSelect
      multiple={multiple}
      defaultValue={defaultValue}
      value={value}
      onChange={onChangeInside}
      disabled={disabled}
      {...restProps}
    >
      {
        makeOptionsCenterAlign ?
          list.map((l, i) => (
            <option key={`option-${l[dataKey]}-${i}`} style={{ p: 1, textAlign: "center" }} value={l[dataKey]}>
              {l[dataValue]}
            </option>
          ))
          :
          list.map((l, i) => (
            <option key={`option-${l[dataKey]}-${i}`} style={{ p: 1 }} value={l[dataKey]}>
              {l[dataValue]}
            </option>
          ))
      }
    </MNativeSelect>
  );
};

export default Select;
