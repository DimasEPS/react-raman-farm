import Brand from '../assets/brand.svg?react'
import BurgerHorizontal from '../assets/burger-horizontal.svg?react'

export default function Header() {
  return (
    <div className="text-white flex justify-between items-center p-4 relative">
      <Brand className='select-none cursor-pointer size-[80px] sm:size-[120px]' />
      <div className='flex items-center gap-1 select-none cursor-pointer'>
        <b>Menu</b>
        <BurgerHorizontal />
      </div>
    </div>
  )
}