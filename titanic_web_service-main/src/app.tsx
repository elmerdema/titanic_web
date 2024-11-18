import { Suspense, useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { ErrorBoundary, ErrorFallback } from '@/core/error';
import { SplashScreen } from '@/core/splash-screen';

import appRoutes from './routes';

export default function App() {
  const routes = useRoutes(appRoutes);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {showSplash ? <SplashScreen /> : <Suspense fallback={<SplashScreen />}>{routes}</Suspense>}
    </ErrorBoundary>
  );
}
