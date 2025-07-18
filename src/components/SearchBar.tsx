import Search from "../assets/search.svg?react"

export default function SearchBar({
  placeholder,
  value,
  setValue
}: {
  placeholder: string
  value: string
  setValue: (value: string) => void 
}) {
  return (
    <div className={`
      flex gap-4 justify-between items-center w-full bg-white rounded-full
      py-2 px-4
    `}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`${!value && "italic"} text-black w-full text-sm`}
      />
      <Search className="size-[32px] aspect-[1/1]" />
    </div>
  )
}