import { TIMER_OPTIONS } from "../constants";
export default function ModeTypeButton({
  modeType,
  currentMode,
  onClick,
} : {
  modeType: "work" | "break";
  currentMode: "work" | "break";
  onClick: () => void;
}) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`${
        currentMode === modeType && "border"
      } size-15 rounded-full grid place-content-center text-4xl cursor-pointer`}
    >
      {TIMER_OPTIONS[modeType].label}
    </button>
  );
}
