import { useIsMobile } from "@/hooks/use-mobile";

export function Responsive({
  desktop,
  mobile,
}: {
  desktop?: React.ReactNode;
  mobile?: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return isMobile ? mobile : desktop;
}
