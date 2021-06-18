import React, { memo, useContext, useState } from "react";
import { CountdownContext } from "../../contexts/CountdownContext";
import { Countdown } from "../Countdown/index";
import styles from "./styles.module.scss";

type DigitationProps = {
  hasError: boolean;
  textForDigitation: string;
  setError: (state: boolean) => void;
};

function Digitation({ hasError, textForDigitation, setError }: DigitationProps) {
  const { stopCountdowm, setHasFinish, hasFinished } = useContext(CountdownContext);

  const [completedText] = useState(textForDigitation);

  const onDigitation = (e: any) => {
    const text: string = e.target.value.replace(/\t/g, "");
    let compareText = completedText.replace(/\t/g, "");

    if (!compareText.includes(text) || !compareText.startsWith(text[0])) {
      setError(true);
      setHasFinish(false);
    } else {
      setError(false);
    }
    if (text.length === 0) {
      setError(false);
    }
    if (compareText === text) {
      setHasFinish(true);
      stopCountdowm(textForDigitation);
    }
  };

  return (
    <>
      <Countdown />
      <div className={styles.containerText}>
        <h3>{textForDigitation}</h3>
      </div>
      {hasError && (
        <div className={styles.containerError}>
          <p>O conteúdo está diferente</p>
        </div>
      )}
      <textarea
        onChange={onDigitation}
        autoFocus
        disabled={hasFinished}
        className={styles.formControl}
        placeholder={"Comece a digitar..."}
      />
    </>
  );
}

export default memo(Digitation);
