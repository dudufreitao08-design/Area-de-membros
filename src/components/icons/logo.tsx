import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary))" opacity="0.4" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path
        d="M18.37 7.29A10.95 10.95 0 0 0 12 4.54a10.95 10.95 0 0 0-6.37 2.75"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
    </svg>
  );
}
