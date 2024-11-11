import { useRef } from "react";

type VerificationInputProps = {
  length: number;
  onComplete: (code: number) => void;
  onChange: (code: number) => void;
};

export default function VerificationInput({
  length,
  onComplete,
  onChange,
}: VerificationInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null),
  );

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (value.length === 1 && /^[0-9]$/.test(value)) {
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      checkCompletion();
    } else if (value === "") {
    } else {
      event.target.value = value.charAt(0);
    }
    checkValue();
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !inputsRef.current[index]?.value) {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const checkCompletion = () => {
    const code = parseInt(
      inputsRef.current.map((input) => input?.value || "").join(""),
    );
    if (code > 999 && code <= 9999) {
      onComplete(code);
    }
  };

  const checkValue = () => {
    const code = parseInt(
      inputsRef.current.map((input) => input?.value || "").join(""),
    );
    if (onChange) {
      onChange(code); // Llama a la prop `onChange` si está definida
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="number"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className="w-16 h-16 border-2 border-green rounded-xl text-center text-xl bg-transparent focus-visible:outline-none focus-visible:border-blue appereance no-spinners"
          onChange={(event) => handleInputChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </div>
  );
}
