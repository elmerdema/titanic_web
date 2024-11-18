import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='relative'>
      <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100' />
      <div className='mx-auto'>
        <div className='relative shadow-xl sm:overflow-hidden'>
          <div
            className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 bg-fixed bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: 'url(images/hero_bg.jpg)' }}
          >
            <h1 className='relative text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl z-10'>
              <span className='block text-white'>Titanic Survivor Predictor</span>
              <span className='block text-indigo-200'>Discover Your Odds of Survival</span>
            </h1>
            <p className='relative mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl z-10'>
              Dive into the past and uncover your fate aboard the Titanic! Our cutting-edge predictor uses advanced
              algorithms to estimate your chances of survival based on passenger data. Explore the possibilities and see
              if you'd defy the odds of history's most famous voyage!
            </p>
            <div className='relative mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center z-10'>
              <div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid'>
                <Link
                  to='/calculator'
                  className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8'
                >
                  Go to the calculator
                </Link>
              </div>
            </div>
            <div className='absolute inset-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-800 to-gray-400 mix-blend-multiply' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
