import React from 'react';
import { Link } from 'react-router-dom';



export const Header: React.FC = () =>  {

  return (
    <nav className="bg-black/80">
      <ul className="h-16 flex justify-between items-center w-full px-4">
        <li className="text-white"><Link to="/">Blog</Link></li>
        <li className="text-white"><Link to="/Contact">お問い合わせ</Link></li>
      </ul>
      </nav>
  );
}