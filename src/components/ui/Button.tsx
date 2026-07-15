'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import type { TrackingEvent } from '@/lib/analytics';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  trackingLabel?: string;
  trackingData?: Record<string, string | number | boolean>;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-white',
    'hover:bg-[var(--color-primary-hover)]',
    'active:bg-[var(--color-primary-active)]',
  ].join(' '),
  secondary: [
    'bg-secondary text-white',
    'hover:bg-secondary-600',
    'active:bg-secondary-700',
  ].join(' '),
  outline: [
    'border-2 border-primary text-primary bg-transparent',
    'hover:bg-primary-subtle',
    'active:bg-primary-light',
  ].join(' '),
  ghost: [
    'bg-transparent text-primary',
    'hover:bg-primary-subtle',
    'active:bg-primary-light',
  ].join(' '),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const BASE_CLASSES = [
  'inline-flex items-center justify-center',
  'rounded-md font-semibold',
  'transition-colors duration-base',
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2',
  'disabled:opacity-50 disabled:pointer-events-none',
  'cursor-pointer',
].join(' ');

function buildClassName(variant: ButtonVariant, size: ButtonSize, extra?: string): string {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], extra]
    .filter(Boolean)
    .join(' ');
}

function handleClick(
  onClick: (() => void) | undefined,
  trackingLabel: string | undefined,
  trackingData: Record<string, string | number | boolean> | undefined,
) {
  if (trackingLabel) {
    const event: TrackingEvent = {
      action: 'button_click',
      category: 'ui',
      label: trackingLabel,
      value: trackingData,
    };
    trackEvent(event);
  }

  onClick?.();
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  trackingLabel,
  trackingData,
  disabled = false,
  children,
  className,
}: ButtonProps) {
  const classes = buildClassName(variant, size, className);
  const onButtonClick = () => handleClick(onClick, trackingLabel, trackingData);

  if (href) {
    if (disabled) {
      return (
        <span
          className={`${classes} pointer-events-none opacity-50`}
          aria-disabled="true"
          role="link"
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onButtonClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onButtonClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
    >
      {children}
    </button>
  );
}
