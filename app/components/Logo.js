import Image from "next/image";
import Link from "next/link";
import WhiteLogo from "@/public/soundcorelogo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center hover:opacity-80 transition-opacity"
    >
      <Image src={WhiteLogo} alt="Logo" width={80} height={80} />
    </Link>
  );
}
