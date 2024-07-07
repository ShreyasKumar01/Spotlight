import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import Mobnav from "./Mobnav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/assets/images/logo.png" width={175} height={60} alt="Logo" />
        </Link>
        <section className="flex items-center justify-end w-full gap-3">
          <SignedIn>
            <nav className="hidden md:flex pr-4">
              <NavItems />
            </nav>
          </SignedIn>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <Mobnav />
        </section>
      </div>
    </header>
  );
};

export default Header;
