import { cn } from "@/lib/utils";

interface InfoPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function InfoPanel({ children, className }: InfoPanelProps) {
  return (
    <div
      className={cn(
        "relative bg-zinc-950/50 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6",
        "h-[calc(100vh-10rem)] overflow-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
