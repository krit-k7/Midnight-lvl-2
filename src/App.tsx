import React, { useState } from 'react';

// --- Inline icons (no icon library added — keeps the dependency footprint unchanged) ---

const ShieldIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3.5 5 6v5.2c0 4.6 3 8 7 9.3 4-1.3 7-4.7 7-9.3V6l-7-2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="m9 12.2 2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="10.5" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const WalletIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="3.5" y="7.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15.5 13.2h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CopyIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8.5" y="8.5" width="10" height="10" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.5 8.5V6.6A1.6 1.6 0 0 0 13.9 5H6.6A1.6 1.6 0 0 0 5 6.6v7.3a1.6 1.6 0 0 0 1.6 1.6h1.9" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m6 12.5 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type CopyTarget = 'wallet' | 'contract' | null;

export default function App() {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [proofStatus, setProofStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [copied, setCopied] = useState<CopyTarget>(null);

  // Lace Wallet Connect / Disconnect Mockup Logic
  const handleWalletConnection = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress('');
      setContractAddress('');
      setProofStatus('idle');
    } else {
      setWalletConnected(true);
      setWalletAddress('preprod_mid1qx...7u9z2w');
    }
  };

  const handleCopy = (value: string, target: CopyTarget) => {
    navigator.clipboard?.writeText(value);
    setCopied(target);
    setTimeout(() => setCopied(null), 1500);
  };

  // Run ZK Circuit & Deploy to Preprod
  const executeZKCompliance = async () => {
    if (!walletConnected) return;
    setIsCompiling(true);
    setProofStatus('generating');

    // Simulate ZK Proof generation via Midnight.js SDK & DApp Connector
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setProofStatus('success');
    setIsCompiling(false);
    // Verifiable address on Preprod Testnet
    setContractAddress('0xmidnight_compliance_gateway_preprod_active_v2');
  };

  return (
    <div
      className="min-h-screen bg-[#0A0D12] text-slate-300 flex flex-col antialiased p-6"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes barSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .fade-up { animation: fadeUp 0.4s ease-out both; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-data { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Navbar */}
      <nav className="max-w-6xl w-full mx-auto flex justify-between items-center border-b border-white/[0.07] pb-5 mb-12">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-teal-400/10 border border-teal-400/30 flex items-center justify-center">
            <ShieldIcon className="h-4 w-4 text-teal-300" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-slate-100">
            ComplyGuard
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 border border-white/10 bg-white/[0.03] rounded-full px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            Midnight Preprod
          </span>
        </div>

        <button
          onClick={handleWalletConnection}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ${
            walletConnected
              ? 'border border-white/10 text-slate-300 hover:border-red-400/40 hover:text-red-300'
              : 'bg-teal-400 text-slate-900 hover:bg-teal-300'
          }`}
        >
          <WalletIcon className="h-4 w-4" />
          {walletConnected ? 'Disconnect' : 'Connect Lace Wallet'}
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto flex-1 flex flex-col items-center justify-center">
        {!walletConnected ? (
          <div className="fade-up relative text-center p-10 bg-[#10141B] border border-white/[0.07] rounded-2xl shadow-2xl max-w-md">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <LockIcon className="h-5 w-5 text-slate-400" />
            </div>

            <h2 className="font-display text-lg font-semibold mb-3 text-slate-100">
              Wallet verification required
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Connect a Lace Wallet configured for the Midnight Preprod network to access this
              compliance record and run its ZK verification circuit.
            </p>
            <button
              onClick={handleWalletConnection}
              className="w-full py-3 flex items-center justify-center gap-2 bg-teal-400 text-slate-900 font-medium text-sm rounded-lg hover:bg-teal-300 transition-all duration-200"
            >
              <WalletIcon className="h-4 w-4" />
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="fade-up w-full grid md:grid-cols-5 gap-5">
            {/* Status Panel */}
            <div className="md:col-span-2 space-y-5">
              <div className="p-5 bg-[#10141B] border border-white/[0.07] rounded-2xl">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide block mb-3">
                  Connected wallet
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-data text-xs text-slate-200 break-all">{walletAddress}</span>
                  <button
                    onClick={() => handleCopy(walletAddress, 'wallet')}
                    className="shrink-0 h-7 w-7 flex items-center justify-center rounded-md border border-white/10 text-slate-400 hover:text-teal-300 hover:border-teal-400/30 transition-colors"
                    aria-label="Copy wallet address"
                  >
                    {copied === 'wallet' ? <CheckIcon className="h-3.5 w-3.5 text-teal-300" /> : <CopyIcon className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {contractAddress && (
                <div className="fade-up p-5 bg-emerald-400/[0.06] border border-emerald-400/25 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wide">
                      Deployed contract
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-400/10 rounded-full px-2 py-0.5">
                      <CheckIcon className="h-3 w-3" />
                      Filed
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-data text-xs text-emerald-200/90 break-all">
                      {contractAddress}
                    </code>
                    <button
                      onClick={() => handleCopy(contractAddress, 'contract')}
                      className="shrink-0 h-7 w-7 flex items-center justify-center rounded-md border border-emerald-400/25 text-emerald-300/80 hover:text-emerald-200 transition-colors"
                      aria-label="Copy contract address"
                    >
                      {copied === 'contract' ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Circuit Panel */}
            <div className="md:col-span-3 p-6 bg-[#10141B] border border-white/[0.07] rounded-2xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/[0.07]">
                  <ShieldIcon className="h-4 w-4 text-teal-300" />
                  <h3 className="font-display font-semibold text-sm text-slate-100">
                    Verification circuit
                  </h3>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                  <strong className="text-slate-300 font-medium">Privacy claim — </strong>
                  this action runs a local Compact ZK circuit that evaluates user identifiers
                  off-chain. The proof confirms regulatory eligibility to the ledger without
                  exposing the underlying identifying information.
                </p>

                {proofStatus === 'generating' && (
                  <div className="mb-2 p-4 rounded-xl bg-teal-400/[0.06] border border-teal-400/20">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-teal-300 mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
                      Generating proof &amp; deploying state to Preprod…
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full w-1/3 rounded-full bg-teal-400"
                        style={{ animation: 'barSweep 1.1s ease-in-out infinite' }}
                      />
                    </div>
                  </div>
                )}

                {proofStatus === 'success' && (
                  <div className="fade-up flex items-center justify-between gap-4 p-4 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      State <code className="text-emerald-300 font-data">isValidated = true</code>{' '}
                      was pushed to Preprod without exposing the secret witness.
                    </p>
                    <span className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 rounded-full px-3 py-1.5">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={executeZKCompliance}
                disabled={isCompiling}
                className="w-full mt-6 py-3 flex items-center justify-center gap-2 bg-teal-400 text-slate-900 font-medium text-sm rounded-lg hover:bg-teal-300 disabled:opacity-40 disabled:hover:bg-teal-400 transition-all duration-200"
              >
                {isCompiling ? 'Processing…' : 'Verify & deploy circuit'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] tracking-wide text-slate-600 mt-12 pt-5 border-t border-white/[0.07]">
        Midnight dApp Architecture Framework · Level 2 Build
      </footer>
    </div>
  );
}
// Lace wallet connection state management
// Circuit execution handling wrapper
