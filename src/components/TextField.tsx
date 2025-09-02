import type React from "react";
import type { JSX } from "react";

export default function TextField({
  label,
  value,
  setValue,
  placeholder,
  trailingIcon,
  required = false,
  type = "text",
  ref = null,
  multiline = false,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  trailingIcon?: (size: string) => JSX.Element;
  required?: boolean;
  type?: string;
  ref?: React.RefObject<HTMLDivElement | null> | null;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col w-full" ref={ref}>
      <span>
        {label}
        <i className="text-vivid-red text-xs">{required && " (wajib diisi)"}</i>
      </span>
      <div
        className={`
        outline-2 outline-[rgba(33,33,33,0.2)] px-4 py-2 rounded-md flex justify-between
        gap-2 items-center
      `}
      >
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full resize-y min-h-[80px]"
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full"
            placeholder={placeholder}
            type={type}
            step="any"
          />
        )}
        {!multiline && trailingIcon && trailingIcon("size-[24px]")}
      </div>
    </div>
  );
}
