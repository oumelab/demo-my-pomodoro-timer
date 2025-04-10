import Refresh from "./assets/refresh.svg?react";
import Play from "./assets/play.svg?react";


export default function App() {
  return (
    <div className="flex flex-col gap-10 pt-16 pb-8 px-6">
      <h1 className="text-center text-5xl font-bold">My Pomodoro Timer</h1>
      <p className="w-fit mx-auto sm:text-center">
        集中力を高める、時間管理テクニックです ⏰
        <br />
        25分間の作業と、5分間の休憩を繰り返し、生産性を向上させましょう！
      </p>
      <div className="w-full max-w-3xl mx-auto">
        <div className="w-full h-auto bg-gradient-to-tl from-secondary to-primary rounded-xl p-4">
          <div className="w-full h-full bg-background rounded-xl flex flex-col gap-5 py-8 px-10">
          <ul className="flex justify-center items-center gap-5">
            <li><button className="size-15 border rounded-full grid place-content-center text-4xl cursor-pointer">🔥</button></li>
            <li><button className="size-15 rounded-full grid place-content-center text-4xl cursor-pointer">☕️</button></li>
          </ul>
          <div className="py-8 grid place-content-center"><span className="text-7xl sm:text-8xl md:text-9xl font-semibold">25:00</span></div>
          <ul className="flex justify-center items-center gap-4">
            <li><button className="size-12 bg-bg-muted rounded-full grid place-content-center text-2xl cursor-pointer"><Play /></button></li>
            <li><button className="size-12 bg-bg-muted rounded-full grid place-content-center text-2xl cursor-pointer"><Refresh /></button></li>
          </ul>
          </div>
        </div>
      </div>
      <footer className="text-center">
        <small>
          Created by <a href="#" className="text-accent hover:underline hover:underline-offset-2">@your-handle</a> &copy;{" "}
          {new Date(Date.now()).getFullYear()}
        </small>
      </footer>
    </div>
  );
}
