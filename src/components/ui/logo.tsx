interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold">
        Elite<span className="text-primary-color">Prize</span>
      </span>
    </div>
  );
}
