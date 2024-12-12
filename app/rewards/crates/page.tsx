'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';
import { NFTImage } from '@/components/ui/nft-image';
import { usePathname } from 'next/navigation';

interface CrateOption {
  name: string;
  ticketCost: number;
  status?: string;
}

//////////////////////////////////////////////////////
/// MOCK Crates DATA (Replace)
//////////////////////////////////////////////////////


const CRATE_OPTIONS: CrateOption[] = [
  { name: 'Crate_Bronze.GLB', ticketCost: 1000 },
  { name: 'Crate_Silver.GLB', ticketCost: 2000, status: 'Coming Soon' },
  { name: 'Crate_Gold.GLB', ticketCost: 3500, status: 'Coming Soon' },
  { name: 'Crate_Platinum.GLB', ticketCost: 5000, status: 'Coming Soon' },
  { name: 'Crate_Diamond.GLB', ticketCost: 10000, status: 'Coming Soon' },
];

type FlowStep = 'select' | 'confirm' | 'success' | 'reveal';

const STEPS = {
  select: { number: 1, title: 'Choose Your Crate' },
  confirm: { number: 2, title: 'Exchange Tickets' },
  success: { number: 3, title: 'Congrats' },
  reveal: { number: 4, title: 'Enjoy your Art!' }
};

export default function CratesPage() {
  const [selectedCrate, setSelectedCrate] = useState<CrateOption | null>(null);
  const [currentStep, setCurrentStep] = useState<FlowStep>('select');
  const pathname = usePathname();

  // Reset on navigation
  useEffect(() => {
    if (pathname === '/rewards' || pathname === '/rewards/crates') {
      setCurrentStep('select');
      setSelectedCrate(null);
    }
  }, [pathname]);

  const handleCrateSelect = (crate: CrateOption) => {
    if (!crate.status) {
      setSelectedCrate(crate);
    }
  };

  const handleConfirm = () => setCurrentStep('confirm');
  const handleRedeem = () => setCurrentStep('success');
  const handleOpen = () => setCurrentStep('reveal');

  // Common layout wrapper
  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-[calc(100vh-16rem)] p-8 max-w-7xl mx-auto">
      <div className="flex flex-col h-full gap-8">
        {children}
      </div>
    </div>
  );

  // Step indicator
  const StepIndicator = ({ step }: { step: FlowStep }) => (
    <div className="flex items-center justify-center mb-1">
      <div className="text-sm text-zinc-500">
        Step {STEPS[step].number} of 4
      </div>
    </div>
  );

  // Common header wrapper
  const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-8">
      <StepIndicator step={currentStep} />
      <h2 className="text-2xl font-medium text-center">{children}</h2>
    </div>
  );

  // Selection View
  if (currentStep === 'select') {
    return (
      <PageWrapper>
        <HeaderWrapper>Choose Your Crate</HeaderWrapper>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {CRATE_OPTIONS.map((crate) => (
            <div 
              key={crate.name}
              onClick={() => handleCrateSelect(crate)}
              className={cn(
                "flex flex-col rounded-xl overflow-hidden cursor-pointer w-48",
                "bg-zinc-900/50 border border-zinc-800/50 transition-colors",
                crate.status && "opacity-50",
                selectedCrate?.name === crate.name && "border-zinc-600 bg-zinc-800/50"
              )}
            >
              <div className="aspect-[4/5] bg-zinc-800/50 flex items-center justify-center text-zinc-600">
                Art Placeholder
              </div>
              <div className="p-3 space-y-1">
                <div className="text-sm font-medium truncate">{crate.name}</div>
                {crate.status ? (
                  <div className="text-sm text-zinc-400">{crate.status}</div>
                ) : (
                  <div className="text-sm text-zinc-400">{crate.ticketCost.toLocaleString()} tickets</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedCrate}
            className={cn(
              "px-8 py-2 rounded-full text-sm transition-colors",
              "bg-zinc-900/50 border border-zinc-800/50 text-zinc-400",
              "hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Select Crate
          </button>
        </div>
      </PageWrapper>
    );
  }

  // Confirmation View
  if (currentStep === 'confirm') {
    return (
      <PageWrapper>
        <HeaderWrapper>Exchange Tickets</HeaderWrapper>
        
        <div className="flex items-center justify-center gap-12 w-full">
          {/* Tickets */}
          <div className="w-64 space-y-2">
            <div className="aspect-[4/5] rounded-xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden">
              <NFTImage />
            </div>
            <div className="text-center text-sm text-zinc-400"># of Tickets (1,000)</div>
          </div>

          {/* Arrow */}
          <div className="flex-none">
            <Flame className="w-12 h-12 text-zinc-600" />
          </div>

          {/* Crate */}
          <div className="w-64 space-y-2">
            <div className="aspect-[4/5] rounded-xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden flex items-center justify-center text-zinc-600">
              Art Placeholder
            </div>
            <div className="text-center text-sm text-zinc-400">Number of Crates (x1)</div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex justify-center">
          <button
            onClick={handleRedeem}
            className="px-8 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
          >
            Redeem for Crate
          </button>
        </div>
      </PageWrapper>
    );
  }

  // Success View
  if (currentStep === 'success') {
    return (
      <PageWrapper>
        <HeaderWrapper>
          Congrats on {selectedCrate?.name}
        </HeaderWrapper>

        <div className="flex justify-center">
          <div className="w-80">
            <div className="aspect-[4/5] rounded-xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden flex items-center justify-center text-zinc-600">
              Art Placeholder
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex justify-center">
          <button
            onClick={handleOpen}
            className="px-8 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
          >
            Open Crate
          </button>
        </div>
      </PageWrapper>
    );
  }

  // Reveal View
  if (currentStep === 'reveal') {
    return (
      <PageWrapper>
        <HeaderWrapper>Enjoy your Art!</HeaderWrapper>

        <div className="flex justify-center">
          <div className="flex gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-64">
                <div className="aspect-[4/5] rounded-xl bg-zinc-900/50 border border-zinc-800/50 overflow-hidden">
                  <NFTImage />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-800/50 flex justify-center">
          <button
            className="px-8 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:bg-zinc-900 transition-colors"
          >
            Share on Social
          </button>
        </div>
      </PageWrapper>
    );
  }
} 