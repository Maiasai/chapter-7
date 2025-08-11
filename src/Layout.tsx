import React from 'react';
import { Outlet} from 'react-router-dom';
import { Header } from './Header';



export const Layout = () =>  {

  return (
    <div>
      <Header />
      <main>
      {/* ここにOutletがあるのでヘッダー下にページ（子コンポーネント「TopPage」が表示される */}
      <Outlet />
      </main>
    </div>
  );
}