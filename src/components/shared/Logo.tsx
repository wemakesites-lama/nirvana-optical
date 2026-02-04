import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  asLink?: boolean;
}

const sizeMap = {
  sm: { width: 120, height: 48 },
  md: { width: 150, height: 60 },
  lg: { width: 200, height: 80 },
};

export function Logo({
  className = "",
  size = "md",
  variant = "dark",
  asLink = true,
}: LogoProps) {
  const { width, height } = sizeMap[size];

  const image = (
    <Image
      src="/logo.jpeg"
      alt="Nirvana Optical - See Better"
      width={width}
      height={height}
      priority
      className={`h-auto w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );

  if (!asLink) {
    return <div className={`inline-block ${className}`}>{image}</div>;
  }

  return (
    <Link href="/" className={`inline-block ${className}`}>
      {image}
    </Link>
  );
}
