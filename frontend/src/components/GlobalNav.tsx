'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function GlobalNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="global-nav">
      <div className="global-nav-container">
        <div className="global-nav-content">
          {/* Logo and Brand */}
          <div className="global-nav-logo">
            <Link href="/" className="global-nav-logo-link">
              <Image
                src="/neurochain_logo__white500px.png"
                alt="Neurochain"
                width={40}
                height={40}
                className="global-nav-logo-image"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="global-nav-links">
            <Link
              href="/"
              className={`global-nav-link ${isActive('/') ? 'global-nav-link-active' : ''}`}
            >
              HOME
            </Link>
            <Link
              href="/demo"
              className={`global-nav-link ${isActive('/demo') ? 'global-nav-link-active' : ''}`}
            >
              DEMO
            </Link>
            <Link
              href="/whitepaper"
              className={`global-nav-link ${isActive('/whitepaper') ? 'global-nav-link-active' : ''}`}
            >
              WHITEPAPER
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 