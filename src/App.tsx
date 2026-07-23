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

  return (
    <div
      className="min-h-screen bg-[#0B0C0E] text-gray-300 flex flex-col antialiased p-6"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <style>{`
        @keyframes stampIn {
          0% { opacity: 0; transform: scale(1.6) rotate(-14deg); }
          60% { opacity: 1; transform: scale(0.94) rotate(-6deg); }
          100% { opacity: 1; transform: scale(1) rotate(-6deg); }
        }
        .stamp-in { animation: stampIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .font-case { font-family: 'Space Mono', monospace; }
      `}</style>

      {/* Navbar */}
      <nav className="max-w-6xl w-full mx-auto flex justify-between items-center border-b border-gray-800/70 pb-5 mb-12">
        <div className="flex items-center gap-4">
          <div className="border border-amber-500/30 bg-black/40 rounded-sm px-2 py-1 font-case text-[10px] tracking-[0.15em] text-amber-500/80">
            FILE&nbsp;№&nbsp;074-MN
          </div>
          <span className="font-case font-bold text-lg tracking-[0.18em] uppercase text-gray-100">
            SecureCompliance
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-dashed border-gray-700 rounded-full px-2.5 py-1">
            Midnight Preprod
          </span>
        </div>

        <button
          onClick={handleWalletConnection}
          className={`font-case uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm border-2 transition-all duration-200 ${
            walletConnected
              ? 'border-rose-500/70 text-rose-400 hover:bg-rose-500 hover:text-black'
              : 'border-amber-500/80 text-amber-400 hover:bg-amber-500 hover:text-black'
          }`}
        >
          {walletConnected ? 'Terminate Session' : 'Connect Lace Wallet'}
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl w-full mx-auto flex-1 flex flex-col items-center justify-center">
        {!walletConnected ? (
          <div className="relative text-center p-10 bg-[#131417] border border-gray-800 rounded-sm shadow-2xl max-w-md overflow-hidden">
            <div className="absolute -right-6 top-6 border-2 border-rose-500/60 text-rose-500/70 font-case uppercase tracking-[0.25em] text-[10px] px-4 py-1 rotate-[-8deg] select-none">
              Access Restricted
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
              className="w-full py-3 border-2 border-amber-500/80 text-amber-400 font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amber-500 hover:text-black transition-all duration-200"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-5 gap-6">
            {/* Status Panel */}
            <div className="md:col-span-2 space-y-4">
              <div className="group relative p-5 bg-[#131417] border border-gray-800 rounded-sm">
                <span className="font-case text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2">
                  Subject Wallet —
                </span>
                <div className="relative font-case text-xs">
                  <span className="text-amber-300/90 break-all">{walletAddress}</span>
                  <div className="absolute inset-0 bg-black flex items-center px-1 text-[9px] tracking-[0.25em] text-gray-600 uppercase transition-opacity duration-300 group-hover:opacity-0">
                    Redacted — hover to reveal
                  </div>
                </div>
              </div>

              {contractAddress && (
                <div className="relative p-5 bg-emerald-500/5 border border-emerald-500/25 rounded-sm overflow-hidden">
                  <span className="font-case text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] block mb-2">
                    Deployed Contract Address
                  </span>
                  <code className="text-xs text-emerald-300 break-all font-case">
                    {contractAddress}
                  </code>
                  <div className="absolute top-2 right-2 border border-emerald-500/50 text-emerald-400 text-[9px] font-case uppercase tracking-widest px-2 py-0.5 rotate-[-4deg]">
                    ✓ Filed
                  </div>
                </div>
              )}
            </div>

            {/* Circuit Panel */}
            <div className="md:col-span-3 p-6 bg-[#131417] border border-gray-800 rounded-sm shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-gray-800">
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
                  <div className="flex items-center gap-3 font-case text-xs text-amber-400 bg-amber-500/5 p-4 rounded-sm border-l-2 border-amber-500/60">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                    Processing proof &amp; deploying state to Preprod...
                  </div>
                )}

                {proofStatus === 'success' && (
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 leading-relaxed max-w-[60%]">
                      State <code className="text-emerald-400">isValidated = true</code> was
                      pushed to Preprod without exposing the secret witness.
                    </div>
                    <div className="stamp-in border-2 border-emerald-500/70 text-emerald-400 font-case font-bold uppercase tracking-widest text-xs px-4 py-2 rotate-[-6deg] select-none">
                      Verified ✓ ZK Proof
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={executeZKCompliance}
                disabled={isCompiling}
                className="w-full mt-6 py-3 border-2 border-amber-500/80 text-amber-400 font-case uppercase tracking-wider text-xs rounded-sm hover:bg-amber-500 hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-amber-400 transition-all duration-200"
              >
                {isCompiling ? 'Processing...' : 'Verify & Deploy Circuit'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center font-case text-[10px] tracking-[0.2em] text-gray-700 mt-12 pt-5 border-t border-dashed border-gray-800">
        Midnight dApp Architecture Framework · Level 2 Build
      </footer>
    </div>
  );
}
// Lace wallet connection state management
// Circuit execution handling wrapper
