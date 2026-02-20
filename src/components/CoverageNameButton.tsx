'use client';

import { useContext } from 'react';
import { CoverageDescriptionContext } from '@/components/CoverageDescriptionModal';
import { getCoverageDescription } from '@/lib/coverage-descriptions';

interface CoverageNameButtonProps {
  name: string;
  className?: string;
  variant?: 'default' | 'red' | 'amber';
}

const variantStyles = {
  default: { border: 'border-gray-400 hover:border-gray-600', icon: 'text-gray-400' },
  red: { border: 'border-red-700/50 hover:border-red-700', icon: 'text-red-700/60' },
  amber: { border: 'border-amber-700/50 hover:border-amber-700', icon: 'text-amber-700/60' },
};

export function CoverageNameButton({ name, className, variant = 'default' }: CoverageNameButtonProps) {
  const context = useContext(CoverageDescriptionContext);
  const hasDescription = !!getCoverageDescription(name);

  if (!hasDescription || !context) {
    return <span className={className}>{name}</span>;
  }

  const styles = variantStyles[variant];

  return (
    <button
      type="button"
      onClick={() => context.showDescription(name)}
      className={`inline text-left border-b border-dashed ${styles.border} cursor-pointer transition-colors ${className ?? ''}`}
    >
      {name}
      <svg
        className={`inline-block w-3.5 h-3.5 ${styles.icon} ml-1 align-middle -mt-px`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4h.01" />
      </svg>
    </button>
  );
}
