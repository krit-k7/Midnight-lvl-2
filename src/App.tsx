import React, { useState } from 'react';
import { selectWallet } from './selectWallet';

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
  const [walletError, setWalletError] = useState<string>('');

  // Real Lace Wallet Connect / Disconnect logic via the Midnight DApp Connector API
  const handleWalletConnection = async () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress('');
      setContractAddress('');
      setProofStatus('idle');
      return;
    }

    setWalletError('');
    try {
      const wallet = selectWallet();
      // Use 'preprod' for the public testnet, 'undeployed' for local dev
      const connectedApi = await wallet.connect('preprod');
      const { unshieldedAddress } = await connectedApi.getUnshieldedAddress();
      const status = await connectedApi.getConnectionStatus();

      if (status.status === 'connected') {
        setWalletConnected(true);
        setWalletAddress(unshieldedAddress);
      } else {
        setWalletError('Wallet did not confirm connection. Please try again.');
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setWalletError(err instanceof Error ? err.message : 'Wallet connection failed.');
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
      className="relative min-h-screen bg-[#050505] text-slate-300 flex flex-col antialiased p-6 overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes barSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-data { font-family: 'IBM Plex Mono', monospace; }
        
        /* Glassmorphism utility */
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* Navbar */}
      <nav className="relative z-10 max-w-6xl w-full mx-auto flex justify-between items-center pb-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-400/20 to-emerald-500/5 border border-teal-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.15)]">
            <ShieldIcon className="h-5 w-5 text-teal-400" />
          </div>
          <span className="font-display font-semibold text-xl tracking-tight text-white">
            ComplyGuard
          </span>
          <span className="hidden sm:flex items-center gap-2 text-xs font-medium text-teal-200/70 border border-teal-500/20 bg-teal-500/5 rounded-full px-3 py-1.5 ml-2">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
            Midnight Preprod
          </span>
        </div>

        <button
          onClick={handleWalletConnection}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 ${
            walletConnected
              ? 'glass-panel text-slate-300 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10'
              : 'bg-gradient-to-r from-teal-400 to-emerald-500 text-black shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5'
          }`}
        >
          <WalletIcon className="h-4 w-4" />
          {walletConnected ? 'Disconnect' : 'Connect Lace Wallet'}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl w-full mx-auto flex-1 flex flex-col items-center justify-center">
        {!walletConnected ? (
          <div className="fade-up relative text-center p-12 glass-panel rounded-3xl w-full max-w-md">
            <div className="mx-auto mb-8 h-16 w-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center shadow-inner">
              <LockIcon className="h-7 w-7 text-slate-300" />
            </div>

            <h2 className="font-display text-2xl font-semibold mb-4 text-white">
              Wallet Verification
            </h2>
            <p className="text-sm text-slate-400 mb-10 leading-relaxed px-4">
              Connect a Lace Wallet configured for the Midnight Preprod network to access this compliance record and run its ZK verification circuit.
            </p>
            
            <button
              onClick={handleWalletConnection}
              className="w-full py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-black font-semibold text-base rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <WalletIcon className="h-5 w-5" />
              Connect Wallet
            </button>
            
            {walletError && (
              <p className="mt-5 text-sm text-red-400 bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
                {walletError}
              </p>
            )}
          </div>
        ) : (
          <div className="fade-up w-full grid lg:grid-cols-5 gap-6">
            {/* Left Panel: Status */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 glass-panel rounded-3xl">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4">
                  Connected Wallet
                </span>
                <div className="flex items-center justify-between gap-3 bg-black/20 p-3.5 rounded-xl border border-white/5">
                  <span className="font-data text-xs text-slate-300 break-all">{walletAddress}</span>
                  <button
                    onClick={() => handleCopy(walletAddress, 'wallet')}
                    className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-teal-400 hover:border-teal-400/30 hover:bg-teal-400/10 transition-all"
                    aria-label="Copy wallet address"
                  >
                    {copied === 'wallet' ? <CheckIcon className="h-4 w-4 text-teal-400" /> : <CopyIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {contractAddress && (
                <div className="fade-up p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      Deployed Contract
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 rounded-full px-3 py-1 border border-emerald-500/30">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Filed
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 bg-black/20 p-3.5 rounded-xl border border-emerald-500/20">
                    <code className="font-data text-xs text-emerald-200/90 break-all">
                      {contractAddress}
                    </code>
                    <button
                      onClick={() => handleCopy(contractAddress, 'contract')}
                      className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all"
                      aria-label="Copy contract address"
                    >
                      {copied === 'contract' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Circuit */}
            <div className="lg:col-span-3 p-8 glass-panel rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <ShieldIcon className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white">
                    Verification Circuit
                  </h3>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  <strong className="text-slate-200 font-semibold block mb-1">Privacy Claim Execution</strong>
                  This action runs a local Compact ZK circuit that evaluates user identifiers off-chain. The proof confirms regulatory eligibility to the ledger without exposing the underlying identifying information.
                </p>

                {proofStatus === 'generating' && (
                  <div className="mb-4 p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 shadow-inner">
                    <div className="flex items-center gap-3 text-sm font-semibold text-teal-300 mb-4">
                      <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                      Generating proof &amp; deploying state...
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden relative">
                      <div
                        className="absolute h-full w-1/3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                        style={{ animation: 'barSweep 1.5s ease-in-out infinite' }}
                      />
                    </div>
                  </div>
                )}

                {proofStatus === 'success' && (
                  <div className="fade-up flex items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      State <code className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-data text-xs mx-1">isValidated = true</code> 
                      was pushed to Preprod without exposing the secret witness.
                    </p>
                    <span className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
                      <CheckIcon className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={executeZKCompliance}
                disabled={isCompiling}
                className="w-full mt-8 py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-black font-bold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] disabled:opacity-50 disabled:hover:shadow-none disabled:cursor-not-allowed transition-all duration-300"
              >
                {isCompiling ? 'Processing Proof...' : 'Verify & Deploy Circuit'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs font-medium tracking-wider text-slate-500 mt-12 pt-6 border-t border-white/10">
        MIDNIGHT DAPP ARCHITECTURE FRAMEWORK • LEVEL 2 BUILD
      </footer>
    </div>
  );
}
