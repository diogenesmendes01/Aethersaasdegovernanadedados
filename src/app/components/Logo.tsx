type LogoProps = {
  size?: number;
  glow?: boolean;
  className?: string;
};

export function Logo({ size = 32, glow = true, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Aether"
      className={className}
      style={glow ? { filter: "drop-shadow(0 0 6px rgba(34,211,238,0.45))" } : undefined}
    >
      <defs>
        <linearGradient id="aether-mark" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B1B3B" />
          <stop offset="55%" stopColor="#1E63D6" />
          <stop offset="100%" stopColor="#2BE2F2" />
        </linearGradient>
      </defs>
      <path
        d="M50 7 L92 93 L70 93 L50 39 L30 93 L8 93 Z"
        fill="url(#aether-mark)"
        stroke="url(#aether-mark)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <ellipse
        cx="50"
        cy="52"
        rx="46"
        ry="16"
        fill="none"
        stroke="#67E8F9"
        strokeWidth="2.5"
        opacity="0.85"
        transform="rotate(-24 50 52)"
      />
    </svg>
  );
}
