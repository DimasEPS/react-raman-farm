import type { JSX } from "react"

export default function TextField({
  label,
  value,
  setValue,
  placeholder,
  trailingIcon,
  required = false,
  type = "text"
}: {
  label: string
  value: string
  setValue: (value: string) => void
  placeholder?: string
  trailingIcon?: (size: string) => JSX.Element,
  required?: boolean
  type?: string
}) {
  return (
    <div className="flex flex-col w-full">
      <span>
        {label}
        <i className="text-vivid-red text-xs">{required && " (wajib diisi)"}</i>
      </span>
      <div className={`
        outline-2 outline-[rgba(33,33,33,0.2)] px-4 py-2 rounded-md flex justify-between
        gap-2 items-center
      `}>
        <input 
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full"
          placeholder={placeholder}
          type={type}
          step="any"
        />
        {
          trailingIcon && trailingIcon("size-[24px]")
        }
      </div>
    </div>
  )
}