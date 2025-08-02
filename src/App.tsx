import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import Navbar from "./components/Navbar";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export default function App() {
  const [mnemonic, setmnemonic] = useState<string>("");
  const [solanaIdx, setSolanaIdx] = useState<number>(0);
  const [solanaWallet, setSolanaWallet] = useState<Keypair[]>([]);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [showPublicKey, setShowPublicKey] = useState<boolean>(false);

  const generateWords = () => {
    const words = generateMnemonic();
    setmnemonic(words);
  };

  const createSolanaWallet = (mnemonic: string) => {
    if (mnemonic == "") {
      alert("Please generate seed phrase before creating wallet!");
    }
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${solanaIdx}'/0'`;
    const derivedSeed = derivePath(path, seed.toString()).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    setSolanaIdx(solanaIdx + 1);
    setSolanaWallet([...solanaWallet, keyPair]);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-center mt-10 text-2xl">Web3 Wallet</h1>
      <Navbar />
      {mnemonic ? (
        ""
      ) : (
        <button
          onClick={generateWords}
          className="py-4 px-10 rounded-xl bg-gray-800 mb-5 cursor-pointer"
        >
          Create Seed Phrase
        </button>
      )}
      {mnemonic ? (
        <div className="bg-gray-800 py-4 px-10 rounded-xl">
          {mnemonic}
          <button
            onClick={() => createSolanaWallet(mnemonic)}
            className="py-3 px-6 bg-white text-black rounded-xl ml-5 cursor-pointer"
          >
            Create Wallet
          </button>
        </div>
      ) : (
        ""
      )}
      <br />
      <div className="border-t">
        <br />
        {solanaWallet.map((i, index) => (
          <div
            className="flex flex-col justify-center items-center"
            key={index}
          >
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
    </div>
  );
}
