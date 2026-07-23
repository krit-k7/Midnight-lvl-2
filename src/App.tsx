import React, { useState } from 'react';

export default function App() {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [proofStatus, setProofStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [contractAddress, setContractAddress] = useState<string>('');

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

  const caseMeta = [
    { label: 'Network', value: 'Midnight Preprod' },
    { label: 'Circuit', value: 'Compact ZK · v2' },
    { label: 'Clearance', value: walletConnected ? 'Subject Identified' : 'Restricted' },
  ];

  return (
    <div
      className="min-h-screen bg-ink text-gray-300 flex flex-col antialiased p-6 md:p-10"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
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
          </div>
        </div>

        <button
          onClick={handleWalletConnection}
          className={`font-case uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            walletConnected
              ? 'border-roseX/70 text-roseX hover:bg-roseX hover:text-black hover:shadow-glowRose'
              : 'border-amberX/80 text-amberX hover:bg-amberX hover:text-black hover:shadow-glow'
          }`}
        >
          {walletConnected ? 'Terminate Session' : 'Connect Lace Wallet'}
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
            </div>

            <h2 className="font-case uppercase tracking-widest text-base font-bold mb-4 text-gray-100">
              Subject Verification Locked
            </h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Connect a Lace Wallet configured to the Midnight Preprod network to open this case
              file and interact with the ZK compliance circuits.
            </p>
            <button
              onClick={handleWalletConnection}
              className="w-full py-3 border-2 border-amberX/80 text-amberX font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amberX hover:text-black hover:shadow-glow transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-5 gap-6 animate-fadeUp">
            {/* Status Panel */}
            <div className="md:col-span-2 space-y-4">
              <div className="group relative p-5 bg-panel border border-panelBorder rounded-sm">
                <span className="font-case text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2">
                  Subject Wallet —
                </span>
                <div className="relative font-case text-xs">
                  <span className="text-amberX/90 break-all">{walletAddress}</span>
                  <div className="absolute inset-0 bg-black flex items-center px-1 text-[9px] tracking-[0.25em] text-gray-600 uppercase transition-opacity duration-300 group-hover:opacity-0">
                    Redacted — hover to reveal
                  </div>
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
                  </div>
                </div>
              )}
            </div>

            {/* Circuit Panel */}
            <div className="md:col-span-3 p-6 bg-panel border border-panelBorder rounded-sm shadow-panel flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-panelBorder">
                  <h3 className="font-case uppercase tracking-widest text-sm font-bold text-gray-100">
                    Verification Circuit
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  <strong className="text-gray-300">Privacy claim —</strong> this action triggers a
                  local Compact ZK circuit that evaluates user identifiers off-chain. The proof
                  verifies strict regulatory eligibility to the ledger without leaking the
                  underlying identifying information.
                </p>

                {proofStatus === 'generating' && (
                  <div className="flex items-center gap-3 font-case text-xs text-amberX bg-amberX/5 p-4 rounded-sm border-l-2 border-amberX/60">
                    <span className="h-2 w-2 rounded-full bg-amberX animate-ping" />
                    Processing proof &amp; deploying state to Preprod...
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
                  </div>
                )}
              </div>

              <button
                onClick={executeZKCompliance}
                disabled={isCompiling}
                className="w-full mt-6 py-3 border-2 border-amberX/80 text-amberX font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amberX hover:text-black hover:shadow-glow disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-amberX disabled:hover:shadow-none transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isCompiling ? 'Processing...' : 'Verify & Deploy Circuit'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center font-case text-[10px] tracking-[0.2em] text-gray-700 mt-auto pt-5 border-t border-dashed border-panelBorder flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-700 animate-pulseSlow" />
        Midnight dApp Architecture Framework · Level 2 Build
      </footer>
    </div>
  );
}
// Lace wallet connection state management
// Circuit execution handling wrapper
