import { Button } from 'antd'
import React, { useState } from 'react'
import { AiFillBackward, AiOutlineAlignLeft, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  const [click, setClick] = useState(false)

  return (
   <div className='flex w-screen h-screen'>
        <div className={`h-full flex-1 bg-slate-200 flex items-center flex-col gap-5 pt-5 ${click ? "max-w-[100px]" : "max-w-[150px]"}`}>
          <Button onClick={() => setClick((val) => val = !val)}>{click ? <AiOutlineRight/> : <AiOutlineLeft/>}</Button>
            <NavLink to={'/'}> {click ? <AiOutlineAlignLeft/> : "Dashboard"}</NavLink>
            <NavLink to={'/create'}>{click ? <AiFillBackward/> : "Create Data"}</NavLink>
            <NavLink to={'/form'}>{click ? <AiFillBackward/> : "form mahasiswa"}</NavLink>
            <NavLink to={'/tabelmessage'}>{click ? <AiFillBackward/> : "Tabel Message"}</NavLink>
        </div>
        <div className='flex-1 bg-slate-100 h-full w-full overflow-y-auto'>
            <Outlet/>
        </div>
   </div>

  )
}

export default Layout