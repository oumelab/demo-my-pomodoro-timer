import {useRef, useState} from "react";
import Pause from "../assets/pause.svg?react";
import Play from "../assets/play.svg?react";
import Refresh from "../assets/refresh.svg?react";
import {TIMER_OPTIONS} from "../constants";
import ControlButton from "./control-button";
import ModeTypeButton from "./mode-type-button";

export default function TimerComponent() {
  // const audioRef = useRef<AudioContext | null>(null);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState<number | null>(
    null
  );

  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // startTimeからの経過時間を計算
  const secondsPassed = startTime != null && now != null ? Math.floor((now - startTime) / 1000) : 0;
  // タイマーに表示する時間を計算
  const calculatedTime = TIMER_OPTIONS[mode].minutes * 60 - secondsPassed;
  // タイマーに表示する分と秒
  const displayMinutes = Math.floor(calculatedTime / 60);
  const displaySeconds = String(
    calculatedTime % 60
  ).padStart(2, "0");
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

  return (
    <div className="w-full max-w-3xl mx-auto h-auto bg-gradient-to-tl from-secondary to-primary rounded-xl p-4">
      <div className="w-full h-full bg-background rounded-xl flex flex-col gap-5 py-8 px-10">
        <ul className="flex justify-center items-center gap-5">
          {["work", "break"].map((modeType) => (
            <li key={modeType}>
              <ModeTypeButton
                modeType={modeType as "work" | "break"}
                currentMode={mode}
                onClick={handleChangeMode}
              />
            </li>
          ))}
          <li></li>
        </ul>
        <div className="py-8 grid place-content-center">
          <span className="text-7xl sm:text-8xl md:text-9xl font-semibold grid grid-cols-[auto_auto_6rem] sm:grid-cols-[auto_auto_8rem] md:grid-cols-[auto_auto_10.25rem] justify-center items-center gap-4">
            <span className="text-right">{displayMinutes}</span>
            <span className="text-center">:</span>
            <span>{displaySeconds}</span>
          </span>
        </div>
        <ul className="flex justify-center items-center gap-4">
          <li>
            {!isRunning ? (
              <ControlButton
                onClick={handleStart}
                Icon={Play}
                buttonLabel="スタート"
              />
            ) : (
              <ControlButton
                onClick={handlePause}
                Icon={Pause}
                buttonLabel="ストップ"
              />
            )}
          </li>
          <li>
            <ControlButton
              onClick={initTimer}
              Icon={Refresh}
              buttonLabel="リセット"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
