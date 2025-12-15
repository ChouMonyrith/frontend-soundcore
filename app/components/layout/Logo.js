import Image from "next/image";
import Link from "next/link";
import WhiteLogo from "@/public/soundcorelogo.png";

export default function Logo({ className, width, height }) {
  return (
    <Link href="/" className={className}>
      <Image src={WhiteLogo} alt="Logo" width={width} height={height} />
    </Link>
  );
}
