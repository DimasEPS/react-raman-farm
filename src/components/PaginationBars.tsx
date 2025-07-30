export default function PaginationBars({
  currentPage,
  setPage,
  totalPage,
  className = ""
}: {
  currentPage: number
  setPage: (page: number) => void
  totalPage: number
  className?: string
}) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {
        Array.from({ length: totalPage }).map((_, i) => (
          <Page 
            page={i + 1}
            selected={i + 1 === currentPage}
            onPageClick={p => setPage(p)}
          />
        ))    
      }
    </div>
  )
}

function Page({
  page,
  selected,
  onPageClick
}: {
  page: number
  selected: boolean
  onPageClick: (p: number) => void
}) {
  return (
    <div 
      className={`
        px-6 py-4 font-medium ${selected ? "bg-primary" : "bg-light-gray"}
        rounded-xl transition-colors duration-300
      `}
      onClick={() => onPageClick(page)}
    >
      {page}
    </div>
  )
}