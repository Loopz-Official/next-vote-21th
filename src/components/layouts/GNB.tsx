'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { GNBLogo } from '@/icons/logo';
import clsx from 'clsx';

const GNB = () => {
  const pathname = usePathname();

  const isLeader = pathname === '/vote/leader';
  const isDemoday = pathname === '/vote/demoday';

  return (
    <nav className="fixed top-0 left-0 z-100 w-screen h-24 px-24 flex justify-between items-center bg-monochrome-white gnb-box-shadow">
      <Link href="/vote/leader">
        <GNBLogo />
      </Link>
      <ul className="w-fit h-fit flex items-center gap-20">
        <li
          className={clsx(
            'gnb-option en-text',
            isLeader && 'gnb-option-active'
          )}
        >
          <Link href="/vote/leader">Leader</Link>
        </li>
        <li
          className={clsx(
            'gnb-option en-text',
            isDemoday && 'gnb-option-active'
          )}
        >
          <Link href="/vote/demoday">Demoday</Link>
        </li>
      </ul>
    </nav>
  );
};

export default GNB;
