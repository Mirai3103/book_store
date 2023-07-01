import React from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hook';
import { Theme, selectTheme } from '@/redux/utilitySplice';

export default function Layout() {
  const theme = useAppSelector(selectTheme);
  React.useEffect(() => {
    const htmlE = document.querySelector('html');
    if (htmlE) {
      htmlE.setAttribute('data-theme', theme);
      if (theme === Theme.Light) {
        htmlE.classList.remove('dark');
      } else {
        htmlE.classList.add('dark');
      }
    }
  }, [theme]);
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full h-full m-0 p-0">
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
