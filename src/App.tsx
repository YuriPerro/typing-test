import React, { useContext, useState } from "react";
import styles from "./App.module.scss";

import Button from "./components/Button";
import Digitation from "./components/Digitation";
import { CountdownContext } from "./contexts/CountdownContext";

import { textDigitation } from "./text.json";

function App() {
  const { startCountdown, resetCountdown, wpmCalculated, hasFinished } =
    useContext(CountdownContext);

  const [error, setError] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [confirmedInitialScreen, setConfirmedInitialScreen] = useState(false);

  const onHandleButton = () => {
    if (!confirmedInitialScreen) {
      setConfirmedInitialScreen(true);
      startCountdown();
      return;
    }
    if (hasFinished && !hasCompleted) {
      setHasCompleted(true);
    }
  };

  const restartTeste = () => {
    setHasCompleted(false);
    resetCountdown();
  };

  return (
    <div className={styles.container}>
      <p>Typing-test</p>
      {hasCompleted && (
        <div className={styles.containerCompleted}>
          <p>🎉 Parabéns 🎉</p>
          <p>Sua velocidade de digitação é {wpmCalculated} palavras por minuto!</p>
        </div>
      )}
      {!confirmedInitialScreen ? (
        <div className={styles.containerInitialScreen}>
          <p className={styles.title}>
            Olá, que bom te ver por aqui. Ao clicar no botão "Iniciar teste" abaixo, você deverá ler
            o texto que será apresentado e digitá-lo no campo de texto, com isso, nós mediremos a
            sua velocidade de digitação 😀.
          </p>
          <p>PS: Assim que clicar no botão, o contador será iniciado.</p>
        </div>
      ) : (
        <Digitation textForDigitation={textDigitation} hasError={error} setError={setError} />
      )}
      {(hasFinished || !confirmedInitialScreen) && !hasCompleted && (
        <Button text={hasFinished ? "Concluir" : "Iniciar teste"} onHandleButton={onHandleButton} />
      )}
      {hasCompleted && <Button text="Reiniciar teste" onHandleButton={restartTeste} />}
    </div>
  );
}

export default App;
