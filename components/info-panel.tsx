interface InfoPanelProps {
  children: React.ReactNode;
}

export function InfoPanel({ children }: InfoPanelProps) {
  return (
    <div className="h-full flex flex-col">
      {children}
    </div>
  );
} 