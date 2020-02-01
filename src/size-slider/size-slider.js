import React from "react";
import PropTypes from "prop-types";
import styles from "./size-slider.module.css";

const SizeSlider = props => (
  <div className={styles.slidecontainer}>
    {`Board Size: ${props.boardSize}`}
    <input
      type="range"
      min="2"
      max="8"
      data-testid="board-size-slider"
      value={props.boardSize}
      className={styles.slider}
      onChange={props.onChange}
    />
  </div>
);

SizeSlider.displayName = "SizeSlider";
SizeSlider.propTypes = {
  boardSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SizeSlider;
