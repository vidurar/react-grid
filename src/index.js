import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";

const Board = () => {
  const INITIAL_GRID = [
    [0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];

  return (
    <div className={styles.container}>
      {INITIAL_GRID.map(row => (
        <div className={styles["board-row"]}>
          {row.map(square => (
            <button
              className={square ? styles["red-square"] : styles.square}
              onClick={() => console.log("CLICK")}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
