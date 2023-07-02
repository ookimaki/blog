import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  title: string;
  href?: string;
};

const Cover = ({ src, title, href }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": href,
      })}
      width={1200}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {href ? (
        <Link href={href} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default Cover;
