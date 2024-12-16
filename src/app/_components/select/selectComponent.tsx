import { useRef, useState } from "react";

type DropdownProps = {
  placeholder: string;
  options: { name: string; value: string }[];
  name: string;
  register: any;
};
export default function Dropdown({
  placeholder,
  options,
  name,
  register,
}: DropdownProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string | "">("");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;
    setTypedText((prev) => prev + e.key.toLowerCase());

    const match = options.find((o) =>
      o.name.toLowerCase().startsWith(typedText + e.key.toLowerCase()),
    );
    if (match) {
      const index = options.findIndex((o) => o.value === match.value);
      const listElement = listRef.current?.children[index] as HTMLElement;
      if (listElement) {
        setHighlightIndex(index);
        listElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
    setTimeout(() => setTypedText(""), 1500);
  };

  return (
    <div
      className="mb-7 relative w-full"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => handleOpenDropdown()}
        className="w-full bg-transparent mt-2 border-blue border-2 flex items-center justify-between rounded-xl h-12 px-5"
      >
        {selected
          ? options.find((option) => option.value === selected)?.name
          : placeholder}
        <span className="material-icons-outlined">expand_more</span>
      </button>
      {isOpen && (
        <ul
          className="border-2 border-blue rounded-xl mt-1 max-h-36 overflow-y-scroll py-2 scrollbar-none"
          ref={listRef}
        >
          {options &&
            options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(option.value)}
                className={`py-1 px-5 hover:bg-blue hover:text-white cursor-pointer ${highlightIndex && highlightIndex === idx ? "bg-blue text-white" : ""}`}
              >
                {option.name}
              </li>
            ))}
        </ul>
      )}
      <input type="hidden" value={selected || ""} {...register(name)} />
    </div>
  );
}
