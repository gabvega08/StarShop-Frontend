import {
  StellarWalletsKit,
  WalletNetwork,
  FreighterModule,
  ISupportedWallet,
  FREIGHTER_ID,
} from '@creit.tech/stellar-wallets-kit';

let kit: StellarWalletsKit | null = null;

function getKit(): StellarWalletsKit {
  if (!kit) {
    kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: [new FreighterModule()],
    });
  }
  return kit;
}

export async function connectWallet(
  onConnected?: (address: string) => void
): Promise<void> {
  try {
    const walletKit = getKit();

    return new Promise((resolve, reject) => {
      walletKit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            walletKit.setWallet(option.id);
            const { address } = await walletKit.getAddress();
            if (onConnected) {
              onConnected(address);
            }
            resolve();
          } catch (error) {
            console.error('Error selecting wallet:', error);
            reject(error);
          }
        },
        onClosed: reason => {
          if (typeof reason === 'string' && reason === 'wallet-not-supported') {
            reject(new Error('Wallet not supported'));
          } else if (typeof reason === 'string' && reason === 'user-closed') {
            reject(new Error('User closed wallet selection'));
          } else if (reason instanceof Error) {
            reject(reason);
          }
        },
      });
    });
  } catch (error) {
    console.error('Error opening wallet modal:', error);
    throw error;
  }
}

export async function getPublicKey(): Promise<string | null> {
  try {
    const walletKit = getKit();
    const { address } = await walletKit.getAddress();
    return address;
  } catch (error) {
    console.log('No wallet connected or error getting address:', error);
    return null;
  }
}

export function disconnectWallet(): void {
  try {
    if (kit) {
      kit.disconnect();
      kit = null;
    }
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
  }
}

export async function signTransaction(
  xdr: string,
  network: string = 'TESTNET'
): Promise<string> {
  try {
    const walletKit = getKit();
    const { address } = await walletKit.getAddress();
    const { signedTxXdr } = await walletKit.signTransaction(xdr, {
      address,
      networkPassphrase:
        network === 'TESTNET' ? WalletNetwork.TESTNET : WalletNetwork.PUBLIC,
    });
    return signedTxXdr;
  } catch (error) {
    console.error('Error signing transaction:', error);
    throw error;
  }
}

export async function isWalletConnected(): Promise<boolean> {
  try {
    const address = await getPublicKey();
    return Boolean(address);
  } catch {
    return false;
  }
}
