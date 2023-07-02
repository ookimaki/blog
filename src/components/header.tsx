import Link from "next/link";

import constants from "@/config/constants.json";
import type View from "@/interfaces/layout-view";

type Props = {
  view: View;
};

const Header = ({ view }: Props) => {
  return (
    <>
      {view === "home" && (
        <section className="mt-16 mb-16 md:mb-12">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">{constants.title}</h1>
        </section>
      )}
      {view === "post" && (
        <section>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/">{constants.title}</Link>
          </h1>
        </section>
      )}
    </>
  );
};

export default Header;
