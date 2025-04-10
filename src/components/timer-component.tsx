import Refresh from "../assets/refresh.svg?react";
import Play from "../assets/play.svg?react";
import Pause from "../assets/pause.svg?react";
import {useEffect, useRef, useState} from "react";
export default function TimerComponent() {
  const WORK_TIME = 3 * 60;
  const BREAK_TIME = 5 * 60;
  const audioContext = useRef<AudioContext | null>(null);
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [count, setCount] = useState<number>(WORK_TIME);

  const initTimer = () => {
    setIsRunning(false);
    setIsWorking(true);
    setCount(WORK_TIME);
  };

  useEffect(() => {
    audioContext.current = new AudioContext();
    if (count > 0 && isRunning) {
      const timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(Number(timerId));
    } else if (count === 0) {
      setIsRunning(false);
      setIsWorking(!isWorking);
      setCount(isWorking ? BREAK_TIME : WORK_TIME);
      setIsRunning(true);
    }
  }, [count, isRunning, isWorking, BREAK_TIME, WORK_TIME]);

  return (
    <div className="w-full h-auto bg-gradient-to-tl from-secondary to-primary rounded-xl p-4">
      <div className="w-full h-full bg-background rounded-xl flex flex-col gap-5 py-8 px-10">
        <ul className="flex justify-center items-center gap-5">
          <li>
            <button
              onClick={() => {
                setIsWorking(true);
                setCount(WORK_TIME);
              }}
              className={`${isWorking ? "border" : ""} size-15 rounded-full grid place-content-center text-4xl cursor-pointer`}
            >
              🔥
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setIsWorking(false);
                setCount(BREAK_TIME);
              }}
              className={`${!isWorking ? "border" : ""} size-15 rounded-full grid place-content-center text-4xl cursor-pointer`}
            >
              ☕️
            </button>
          </li>
        </ul>
        <div className="py-8 grid place-content-center">
          <span className="text-7xl sm:text-8xl md:text-9xl font-semibold">
            {String(Math.floor(count / 60)).padStart(2, "0")} :{" "}
            {String(count % 60).padStart(2, "0")}
          </span>
        </div>
        <ul className="flex justify-center items-center gap-4">
          <li>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="size-12 bg-bg-muted rounded-full grid place-content-center text-2xl cursor-pointer"
            >
              {isRunning ? <Pause /> : <Play />}
            </button>
          </li>
          <li>
            <button
              onClick={() => initTimer()}
              className="size-12 bg-bg-muted rounded-full grid place-content-center text-2xl cursor-pointer"
            >
              <Refresh />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}