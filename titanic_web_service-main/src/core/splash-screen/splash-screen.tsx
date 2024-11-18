import './splash-screen.scss';

export function SplashScreen() {
  return (
    <div className='splash-screen'>
      <img className='h-20 w-auto' src='images/logo.png' alt='Carpathia' />
      <div className='mt-8'>
        <div className='loader'></div>
      </div>
    </div>
  );
}
