import Header from '@/pages/home/components/Header/Header';
import Footer from '@/pages/home/components/Footer/Footer';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <>
      <div className='min-h-full pt-16 pb-12 flex flex-col bg-white'>
        <Header />
        <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-16'>
            <div className='text-center'>
              <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>Page not found.</h1>
              <p className='mt-2 text-base text-gray-500'>Sorry, we couldn’t find the page you’re looking for.</p>
              <div className='mt-6'>
                <Link to='/' className='text-base font-medium text-blue-600 hover:text-indigo-500'>
                  Go back home<span aria-hidden='true'> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
