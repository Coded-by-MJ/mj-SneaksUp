import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="w-[60px] h-[45px] relative">
      <Image
        src={"/sneakerLogo.svg"}
        alt="logo"
        width="100"
        height="100"
        priority
      />
    </Link>
  );
}
export default Logo;
