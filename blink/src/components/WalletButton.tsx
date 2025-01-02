import { WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css'; // Import default styles for Wallet Adapter
import { useMemo } from 'react';

export function WalletButton() {
    // Initialize supported wallets using useMemo for optimization
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        [] // Ensures memoization
    );

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {/* Wallet Connect Button */}
                <div className="flex justify-center items-center">
                    <WalletMultiButton
                        className="bg-black text-white rounded-lg px-6 py-3 font-medium shadow-md hover:bg-gray-800 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        style={{
                            color: 'white',
                            backgroundColor: 'black',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}

