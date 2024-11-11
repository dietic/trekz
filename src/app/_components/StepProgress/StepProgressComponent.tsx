type StepProgressProps = {
  step: number;
  steps: number;
  className: string;
};
export default function StepProgress(props: StepProgressProps) {
  const { step, steps, className } = props;
  return (
    <div className={`w-full flex flex-row gap-1 ${className}`}>
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          className={`flex-1 border-2 border-solid border-green rounded-xl px-2 flex justify-end items-center font-bold h-8 ${
            i + 1 <= step ? "bg-green text-white" : "bg-transparent text-green"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
