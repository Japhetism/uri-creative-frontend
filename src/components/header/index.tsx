import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-end">
          <img
            src='/assets/images/logo.png'
            alt="User Logo"
            width="90"
            height="55"
          />
          <span className="text-lg font-bold">Job Portal</span>
        </div>

        <nav>
          <Link href="/applications">
            My Applications
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
