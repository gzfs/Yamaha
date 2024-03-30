import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="py-5 flex w-full justify-between">
      <Image src="/images/550574.png" alt="Logo" width={200} height={100} />
      <Image
        src="/images/about-us.png"
        alt="Call of the Blue"
        className="scale-50"
        width={200}
        height={100}
      />
    </nav>
  );
}
