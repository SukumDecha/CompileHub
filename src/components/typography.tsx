import { cn } from "@/lib/utils";
import { FC } from "react";

type TypographyProps = {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small";
  text: string;
  className?: string;
};
const Typography: FC<TypographyProps> = ({
  variant = "p",
  text,
  className,
}) => {
  const Tag = variant;

  const tagStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    small: "text-sm font-medium leading-none",
  };

  const combinedClassName = cn(className, tagStyles[variant]);
  return <Tag className={combinedClassName}>{text}</Tag>;
};

export default Typography;
