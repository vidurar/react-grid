import React from "react";
import styles from "./tooltip.module.css";

const Tooltip = () => (
  <div className={styles.tooltip}>
    React Grid Project
    <span className={styles.tooltiptext}>
      When you click on a filled square, count the number of filled squares
      connected to this square, and all other filled squares connected to those
      squares. Write this number into the clicked square. Squares are connected
      if they are touching horizontally or vertically, NOT diagonal. Numbers in
      other coloured squares should be cleared when a new square is clicked.
      Clicking on a non-filled square should do nothing. While hovering over a
      filled square, temporarily change the colour of all connected squares.
      Allow the grid to be randomly generated with size NxN elements with 0s and
      1s in. Add a slider to vary N. Add a colour picker to allow the user to
      change the hover and background colours of the grid.
    </span>
  </div>
);

export default Tooltip;
