import Search from "../assets/search.svg?react"

export default function SearchBar({
  placeholder,
  value,
  setValue,
  onSearch
}: {
  placeholder: string
  value: string
  setValue: (value: string) => void 
  onSearch?: () => void
}) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch()
    }
  }

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch()
    }
  }

  return (
    <div className={`
      flex gap-4 justify-between items-center w-full bg-white rounded-full
      py-2 px-4
    `}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={`${!value && "italic"} text-black w-full text-sm outline-none`}
      />
      <Search 
        className={`size-[32px] aspect-[1/1] ${onSearch ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}`}
        onClick={handleSearchClick}
      />
    </div>
  )
}