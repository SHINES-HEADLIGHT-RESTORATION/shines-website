import Image from "next/image";

export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <Image
      src="/images/shines-logo-white.png"
      alt=""
      width={24}
      height={24}
      className={`${className}${variant === "dark" ? " invert" : ""}`}
      aria-hidden
      priority
    />
  );
}
