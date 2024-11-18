import Footer from '@/pages/home/components/Footer/Footer';
import Header from '@/pages/home/components/Header/Header';
import Calculator from '../../components/Calculator';

export default function CalculatorPage() {
  return (
    <div className='min-h-full'>
      <Header />
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <Calculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
