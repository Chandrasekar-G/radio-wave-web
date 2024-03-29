import Link from "next/link";

function SidebarNav() {
  return (
    <>
      <div>SidebarNav hiii</div>
      <Link href="/home">Home</Link>
      <Link href="/country/en">Country</Link>
      <Link href="/language/tm">Language</Link>
    </>
  );
}

export default SidebarNav;
