'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackNavClick } from '@/lib/analytics';
import { NAV_LINKS } from '@/data/navigation';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for shadow effect
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  function handleNavClick(destination: string) {
    trackNavClick(destination);
  }

  const headerClasses = [
    'sticky top-0 z-40 w-full bg-[var(--color-bg-elevated)]',
    'transition-shadow duration-base',
    isScrolled ? 'shadow-md' : 'shadow-none',
  ].join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => handleNavClick('Home')}
            className="font-display text-xl font-bold text-[var(--color-text)] transition-colors duration-base hover:text-[var(--color-text-link)] md:text-2xl"
          >
            mochis-play
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className={[
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-base',
                    isActive
                      ? 'text-[var(--color-text-link)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={openMobileNav}
            className="rounded-md p-2 text-[var(--color-text-secondary)] transition-colors duration-base hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] md:hidden"
            aria-label="Abrir menú"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        links={NAV_LINKS}
      />
    </>
  );
}
