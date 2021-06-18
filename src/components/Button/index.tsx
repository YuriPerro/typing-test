import React, { memo } from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
  onHandleButton: React.MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
};

function Button({ onHandleButton, text }: ButtonProps) {
  return (
    <div className={styles.containerBtn}>
      <button onClick={onHandleButton} className={styles.btnStart}>
        {text}
      </button>
    </div>
  );
}

export default memo(Button);
