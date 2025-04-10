export default function ControlButton({
  onClick,
  Icon,
  buttonLabel,
} : {
  onClick: () => void;
  Icon: React.ElementType;
  buttonLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className="size-12 bg-bg-muted rounded-full grid place-content-center text-2xl cursor-pointer"
    >
      <Icon />
      <span className="sr-only">{buttonLabel}</span>
    </button>
  );
}
