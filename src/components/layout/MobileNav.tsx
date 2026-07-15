'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackNavClick } from '@/lib/analytics';
import type { NavLink } from '@/data/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when the panel opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap: keep Tab cycling within the panel
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusableElements =
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [],
  );

  // Close when clicking the overlay backdrop
  function handleOverlayClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleLinkClick(destination: string) {
    trackNavClick(destination);
    onClose();
  }

  // Always render for CSS transition support; use visibility to hide when closed
  const containerClasses = [
    'fixed inset-0 z-50 flex',
    isOpen ? 'visible' : 'invisible pointer-events-none',
  ].join(' ');

  const backdropClasses = [
    'fixed inset-0 bg-black/40 transition-opacity duration-slow',
    isOpen ? 'opacity-100' : 'opacity-0',
  ].join(' ');

  const panelClasses = [
    'relative ml-auto flex h-full w-full max-w-xs flex-col bg-[var(--color-bg-elevated)] shadow-modal',
    'transform transition-transform duration-slow ease-default',
    isOpen ? 'translate-x-0' : 'translate-x-full',
  ].join(' ');

  return (
    <div
      id="mobile-nav"
      className={containerClasses}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      aria-hidden={!isOpen}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className={backdropClasses}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={panelClasses}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-[var(--color-text-secondary)] transition-colors duration-base hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]"
            aria-label="Cerrar menú"
            tabIndex={isOpen ? 0 : -1}
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-1 flex-col gap-1 px-4" aria-label="Navegación móvil">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.label)}
                className={[
                  'rounded-md px-4 py-3 font-display text-lg font-semibold transition-colors duration-base',
                  isActive
                    ? 'bg-primary-subtle text-primary'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)]',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
