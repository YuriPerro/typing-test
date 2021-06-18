import { createContext, ReactNode, useEffect, useState } from "react";

let countdownInterval: NodeJS.Timeout;

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  wpmCalculated: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  stopCountdowm: (textForDigitation: string) => void;
  setHasFinish: (state: boolean) => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const [wpmCalculated, setWpmCalculated] = useState(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountdown = () => {
    clearInterval(countdownInterval);
    setTime(0);
    setIsActive(true);
    setHasFinished(false);
  };

  const stopCountdowm = (textForDigitation: string) => {
    clearInterval(countdownInterval);
    const lengthText = textForDigitation.length / 5;
    const wpm = lengthText / (time / 60);
    setWpmCalculated(Math.round(wpm));
  };

  const setHasFinish = (state: boolean) => {
    setHasFinished(state);
  };

  useEffect(() => {
    if (isActive && time === 0) {
      countdownInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
        stopCountdowm,
        setHasFinish,
        wpmCalculated,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
