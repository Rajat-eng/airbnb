import React from 'react'
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';
const Navbar = () => {
  return (
    <div className='fixed w-full bg-slate-100 shadow-md'>
        <div className='py-4 border-b-[1px] border-black'>
            <Container>
                <div 
                className='flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0'
                >
                <Logo />
                <Search />
                <UserMenu />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar