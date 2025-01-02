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
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        []
    );

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <div>
                    {/* Wallet Button */}
                    <WalletMultiButton className="bg-black text-white rounded-lg px-6 py-3 font-medium shadow-md hover:bg-gray-800 transition">
                        Connect Wallet
                    </WalletMultiButton>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}
