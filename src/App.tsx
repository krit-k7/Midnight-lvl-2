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
@@ -20,6 +65,12 @@ export default function App() {
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
@@ -35,191 +86,187 @@ export default function App() {
    setContractAddress('0xmidnight_compliance_gateway_preprod_active_v2');
  };

  const caseMeta = [
    { label: 'Network', value: 'Midnight Preprod' },
    { label: 'Circuit', value: 'Compact ZK · v2' },
    { label: 'Clearance', value: walletConnected ? 'Subject Identified' : 'Restricted' },
  ];

  return (
    <div
      className="min-h-screen bg-ink text-gray-300 flex flex-col antialiased p-6 md:p-10"
      className="min-h-screen bg-[#0A0D12] text-slate-300 flex flex-col antialiased p-6"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
          'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Navbar */}
      <nav className="max-w-6xl w-full mx-auto flex flex-wrap gap-4 justify-between items-center border-b border-panelBorder pb-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 shrink-0 rounded-sm border border-amberX/40 bg-black/40 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"
                stroke="#F5A524"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
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

          <div className="flex items-center gap-3 flex-wrap">
            <div className="border border-amberX/30 bg-black/40 rounded-sm px-2 py-1 font-case text-[10px] tracking-[0.15em] text-amberX/80">
              FILE&nbsp;№&nbsp;074-MN
            </div>
            <span className="font-case font-bold text-lg tracking-[0.18em] uppercase text-gray-100">
              SecureCompliance
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-dashed border-gray-700 rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  walletConnected ? 'bg-emeraldX animate-pulseSlow' : 'bg-gray-600'
                }`}
              />
              Midnight Preprod
            </span>
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
          className={`font-case uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ${
            walletConnected
              ? 'border-roseX/70 text-roseX hover:bg-roseX hover:text-black hover:shadow-glowRose'
              : 'border-amberX/80 text-amberX hover:bg-amberX hover:text-black hover:shadow-glow'
              ? 'border border-white/10 text-slate-300 hover:border-red-400/40 hover:text-red-300'
              : 'bg-teal-400 text-slate-900 hover:bg-teal-300'
          }`}
        >
          {walletConnected ? 'Terminate Session' : 'Connect Lace Wallet'}
          <WalletIcon className="h-4 w-4" />
          {walletConnected ? 'Disconnect' : 'Connect Lace Wallet'}
        </button>
      </nav>

      {/* Case metadata strip — fills the header/content gap with real context */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-3 gap-3 mb-12">
        {caseMeta.map((item) => (
          <div
            key={item.label}
            className="border border-panelBorder bg-panel/60 rounded-sm px-4 py-3"
          >
            <div className="font-case text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-1">
              {item.label}
            </div>
            <div className="font-case text-xs text-gray-300 truncate">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto flex-1 flex flex-col items-center justify-center pb-12">
      <main className="max-w-4xl w-full mx-auto flex-1 flex flex-col items-center justify-center">
        {!walletConnected ? (
          <div className="relative text-center p-10 bg-panel border border-panelBorder rounded-sm shadow-panel max-w-md w-full overflow-hidden animate-fadeUp">
            <div className="absolute -right-9 top-7 border-2 border-roseX/60 text-roseX/70 font-case uppercase tracking-[0.25em] text-[9px] px-9 py-1 rotate-[38deg] select-none">
              Access Restricted
            </div>

            <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-amberX/30 bg-black/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <rect x="5" y="10" width="14" height="9" rx="1.5" stroke="#F5A524" strokeWidth="1.5" />
                <path d="M8 10V7a4 4 0 118 0v3" stroke="#F5A524" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
          <div className="fade-up relative text-center p-10 bg-[#10141B] border border-white/[0.07] rounded-2xl shadow-2xl max-w-md">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <LockIcon className="h-5 w-5 text-slate-400" />
            </div>

            <h2 className="font-case uppercase tracking-widest text-base font-bold mb-4 text-gray-100">
              Subject Verification Locked
            <h2 className="font-display text-lg font-semibold mb-3 text-slate-100">
              Wallet verification required
            </h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Connect a Lace Wallet configured to the Midnight Preprod network to open this case
              file and interact with the ZK compliance circuits.
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Connect a Lace Wallet configured for the Midnight Preprod network to access this
              compliance record and run its ZK verification circuit.
            </p>
            <button
              onClick={handleWalletConnection}
              className="w-full py-3 border-2 border-amberX/80 text-amberX font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amberX hover:text-black hover:shadow-glow transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              className="w-full py-3 flex items-center justify-center gap-2 bg-teal-400 text-slate-900 font-medium text-sm rounded-lg hover:bg-teal-300 transition-all duration-200"
            >
              <WalletIcon className="h-4 w-4" />
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-5 gap-6 animate-fadeUp">
          <div className="fade-up w-full grid md:grid-cols-5 gap-5">
            {/* Status Panel */}
            <div className="md:col-span-2 space-y-4">
              <div className="group relative p-5 bg-panel border border-panelBorder rounded-sm">
                <span className="font-case text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2">
                  Subject Wallet —
            <div className="md:col-span-2 space-y-5">
              <div className="p-5 bg-[#10141B] border border-white/[0.07] rounded-2xl">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide block mb-3">
                  Connected wallet
                </span>
                <div className="relative font-case text-xs">
                  <span className="text-amberX/90 break-all">{walletAddress}</span>
                  <div className="absolute inset-0 bg-black flex items-center px-1 text-[9px] tracking-[0.25em] text-gray-600 uppercase transition-opacity duration-300 group-hover:opacity-0">
                    Redacted — hover to reveal
                  </div>
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
                <div className="relative p-5 bg-emeraldX/5 border border-emeraldX/25 rounded-sm overflow-hidden animate-fadeUp">
                  <span className="font-case text-[10px] font-bold text-emeraldX uppercase tracking-[0.2em] block mb-2">
                    Deployed Contract Address
                  </span>
                  <code className="text-xs text-emeraldX/90 break-all font-case">
                    {contractAddress}
                  </code>
                  <div className="absolute top-2 right-2 border border-emeraldX/50 text-emeraldX text-[9px] font-case uppercase tracking-widest px-2 py-0.5 rotate-[-4deg]">
                    ✓ Filed
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
            <div className="md:col-span-3 p-6 bg-panel border border-panelBorder rounded-sm shadow-panel flex flex-col justify-between">
            <div className="md:col-span-3 p-6 bg-[#10141B] border border-white/[0.07] rounded-2xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-panelBorder">
                  <h3 className="font-case uppercase tracking-widest text-sm font-bold text-gray-100">
                    Verification Circuit
                <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/[0.07]">
                  <ShieldIcon className="h-4 w-4 text-teal-300" />
                  <h3 className="font-display font-semibold text-sm text-slate-100">
                    Verification circuit
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  <strong className="text-gray-300">Privacy claim —</strong> this action triggers a
                  local Compact ZK circuit that evaluates user identifiers off-chain. The proof
                  verifies strict regulatory eligibility to the ledger without leaking the
                  underlying identifying information.
                <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                  <strong className="text-slate-300 font-medium">Privacy claim — </strong>
                  this action runs a local Compact ZK circuit that evaluates user identifiers
                  off-chain. The proof confirms regulatory eligibility to the ledger without
                  exposing the underlying identifying information.
                </p>

                {proofStatus === 'generating' && (
                  <div className="flex items-center gap-3 font-case text-xs text-amberX bg-amberX/5 p-4 rounded-sm border-l-2 border-amberX/60">
                    <span className="h-2 w-2 rounded-full bg-amberX animate-ping" />
                    Processing proof &amp; deploying state to Preprod...
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
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-xs text-gray-500 leading-relaxed max-w-[60%]">
                      State <code className="text-emeraldX">isValidated = true</code> was
                      pushed to Preprod without exposing the secret witness.
                    </div>
                    <div className="animate-stampIn border-2 border-emeraldX/70 text-emeraldX font-case font-bold uppercase tracking-widest text-xs px-4 py-2 rotate-[-6deg] select-none">
                      Verified ✓ ZK Proof
                    </div>
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
                className="w-full mt-6 py-3 border-2 border-amberX/80 text-amberX font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amberX hover:text-black hover:shadow-glow disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-amberX disabled:hover:shadow-none transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                className="w-full mt-6 py-3 flex items-center justify-center gap-2 bg-teal-400 text-slate-900 font-medium text-sm rounded-lg hover:bg-teal-300 disabled:opacity-40 disabled:hover:bg-teal-400 transition-all duration-200"
              >
                {isCompiling ? 'Processing...' : 'Verify & Deploy Circuit'}
                {isCompiling ? 'Processing…' : 'Verify & deploy circuit'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center font-case text-[10px] tracking-[0.2em] text-gray-700 mt-auto pt-5 border-t border-dashed border-panelBorder flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-700 animate-pulseSlow" />
      <footer className="text-center text-[11px] tracking-wide text-slate-600 mt-12 pt-5 border-t border-white/[0.07]">
        Midnight dApp Architecture Framework · Level 2 Build
      </footer>
    </div>
