import { Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Popover className='relative bg-white'>
        <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='sr-only'>Carpathia</span>
              <img className='h-8 w-auto sm:h-10' src='images/logo.png' alt='Carpathia' />
            </Link>
          </div>
          <div className='md:flex items-center justify-end md:flex-1 lg:w-0'>
            <Link
              to='/calculator'
              className='ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700'
            >
              Calculator
            </Link>
          </div>
        </div>
      </Popover>
    </header>
  );
}
