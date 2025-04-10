import { useEffect, useRef, useState } from "react";
import { useAudio } from "./useAudio";
import { TIMER_OPTIONS } from "../constants";

export const useTimer = () => {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState<number | null>(
    null
  );
  const {audioRef, playChime} = useAudio();

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (startTime && now) {
      const timePassed = now - startTime;
      const totalTime = TIMER_OPTIONS[mode].minutes * 60 * 1000;

      if (timePassed >= totalTime) {
        playChime();
        handleChangeMode();
        handleStart();
      }
    }
    // ESLintの useEffect 依存関係の警告を無視する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, startTime, mode]);

  // startTimeからの経過時間を計算
  const secondsPassed =
    startTime != null && now != null ? Math.floor((now - startTime) / 1000) : 0;
  // タイマーに表示する時間を計算
  const calculatedTime = TIMER_OPTIONS[mode].minutes * 60 - secondsPassed;
  // タイマーに表示する分と秒
  const displayMinutes = Math.floor(calculatedTime / 60);
  const displaySeconds = String(calculatedTime % 60).padStart(2, "0");
  // calculateTime % 60 < 10 ? "0" + (calculateTime % 60) : calculateTime % 60;

  const handleChangeMode = () => {
    initTimer();
    setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
  };

  const initTimer = () => {
    // clearInterval(timerRef.current!);
    clearTimeout(timerRef.current!);
    setStartTime(null);
    setNow(null);
    setIsRunning(false);
    setPausedTimeRemaining(null);
  };

  const handleStart = () => {
    if (audioRef.current) {
      // ユーザーの操作によって音を再生
      audioRef.current.resume();
    }

    const currentTime = Date.now();
    if (!isRunning && pausedTimeRemaining) {
      setStartTime(currentTime - pausedTimeRemaining);
      setPausedTimeRemaining(null);
    } else {
      setStartTime(currentTime);
    }
    setNow(Date.now());
    // clearInterval(timerRef.current!);
    // timerRef.current = setInterval(() => {
    //   setNow(Date.now());
    // }, 1000);
    clearTimeout(timerRef.current!);
    // １行ごとに、現在時刻をstateのnowに格納
    const timer = () => {
      setNow(Date.now());
      timerRef.current = setTimeout(timer, 1000);
    };
    timer();

    setIsRunning(true);
  };
  const handlePause = () => {
    // clearInterval(timerRef.current!);
    clearTimeout(timerRef.current!);
    setIsRunning(false);

    if (startTime != null && now != null) {
      setPausedTimeRemaining(now - startTime!);
    }
  };

  return {
    displayMinutes,
    displaySeconds,
    handleChangeMode,
    handleStart,
    handlePause,
    isRunning,
    mode,
    initTimer,
  };
};
