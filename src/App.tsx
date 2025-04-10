import TimerComponent from "./components/timer-component";


export default function App() {
  return (
    <div className="flex flex-col gap-10 pt-16 pb-8 px-6">
      <h1 className="text-center text-[3.25rem] font-bold">My Pomodoro Timer</h1>
      <p className="w-fit mx-auto sm:text-center">
        集中力を高める、時間管理テクニックです ⏰
        <br />
        25分間の作業と、5分間の休憩を繰り返し、生産性を向上させましょう！
      </p>
      <div className="w-full max-w-3xl mx-auto">
        <TimerComponent />
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
