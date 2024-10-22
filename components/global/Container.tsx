import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-[90rem] px-6 md:px-8", className)}>
      {children}
    </section>
  );
}
export default Container;
