import type { Keypair } from "@solana/web3.js";
import { useState } from "react";

export default function SolanaWallet({ wallet }: { wallet: Keypair[] }) {
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [showPublicKey, setShowPublicKey] = useState<boolean>(false);

  return (
    <div>
      <h3 className="text-center text-xl">Solana Wallet</h3>
      {wallet.map((i, index) => (
        <div className="flex flex-col justify-center items-center" key={index}>
          <div className="w-7xl border py-5 px-10 m-2 rounded-xl bg-gray-300 text-gray-800">
            <div className="flex justify-between items-center">
              <span>
                <strong>Public Key: </strong>
                {showPublicKey ? (
                  <span>{i.publicKey.toBase58()}</span>
                ) : (
                  "*******************************************************************"
                )}
              </span>
              <button
                className="ml-10 bg-gray-800 text-white py-2 px-8 rounded-xl cursor-pointer"
                onClick={() => setShowPublicKey(!showPublicKey)}
              >
                Show
              </button>
            </div>
            <br />
            <div className="flex justify-between items-center">
              <span>
                <strong>Private Key: </strong>
                {showPrivateKey ? (
                  <span>{Buffer.from(i.secretKey).toString("base64")}</span>
                ) : (
                  "*******************************************************************"
                )}
              </span>
              <button
                className="ml-10 bg-gray-800 text-white py-2 px-8 rounded-xl cursor-pointer"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                Show
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
