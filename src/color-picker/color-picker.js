import React from "react";
import PropTypes from "prop-types";
import styles from "./color-picker.module.css";

const ColorPicker = props => (
  <div className={styles.container}>
    {props.label}
    <input
      type="color"
      data-testid={props.testId}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

ColorPicker.displayName = "ColorPicker";
ColorPicker.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
