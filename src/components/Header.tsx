import { useNavigate } from 'react-router-dom'
import Brand from '../assets/brand.svg?react'

export default function Header() {
  const navigate = useNavigate()

  return (
    <div className="text-white flex justify-between items-center p-4 relative">
      <Brand className='select-none cursor-pointer size-[80px] sm:size-[120px]' />
      <button
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  )
}