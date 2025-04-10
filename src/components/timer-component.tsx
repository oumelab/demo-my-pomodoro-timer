import Refresh from "../assets/refresh.svg?react";
import Play from "../assets/play.svg?react";
import Pause from "../assets/pause.svg?react";
import {useState} from "react";
import { TIMER_OPTIONS } from "../constants";
import ControlButton from "./control-button";
import ModeTypeButton from "./mode-type-button";


export default function TimerComponent() {
  // const audioRef = useRef<AudioContext | null>(null);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const displayMinutes = (minutes: number) => {
    return String(Math.floor(minutes * 60 / 60)).padStart(2, "0");
  };

  const displaySeconds = (minutes: number) => {
    return String(minutes * 60 % 60).padStart(2, "0");
  };

  const handleChangeMode = () => {
    setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
  };

  const initTimer = () => {
    setIsRunning(false);
  };

  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
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
          <li>
            
          </li>
        </ul>
        <div className="py-8 grid place-content-center">
          <span className="text-7xl sm:text-8xl md:text-9xl font-semibold grid grid-cols-[12rem_auto_12rem] items-center gap-4">
            <span className="text-right">{displayMinutes(TIMER_OPTIONS[mode].minutes)}</span>
            <span className="text-center">:</span>
            <span>{displaySeconds(TIMER_OPTIONS[mode].minutes)}</span>
          </span>
        </div>
        <ul className="flex justify-center items-center gap-4">
          <li>
            {
              !isRunning ? (
                <ControlButton onClick={handleStart} Icon={Play} buttonLabel="スタート" />
              ) : (
                <ControlButton onClick={handlePause} Icon={Pause} buttonLabel="ストップ" />
              )}
          </li>
          <li>
            <ControlButton onClick={initTimer} Icon={Refresh} buttonLabel="リセット" />
          </li>
        </ul>
      </div>
    </div>
  );
}
