import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Keypair } from "@solana/web3.js";
import { Wallet } from "ethers";
import { createEthereumWallet } from "./utils/createEthereumWallet";
import { createSolanaWallet } from "./utils/createSolanaWallet";
import SolanaWallet from "./components/SolanaWallet";
import EthereumWallet from "./components/EthereumWallet";

export default function App() {
  const [mnemonic, setmnemonic] = useState<string>("");
  const [solanaIdx, setSolanaIdx] = useState<number>(0);
  const [solanaWallet, setSolanaWallet] = useState<Keypair[]>([]);
  const [ethereumIdx, setEthereumIdx] = useState<number>(0);
  const [ethereumWallet, setEthereumWallet] = useState<Wallet[]>([]);
  const [selectWalletType, setSelectWalletType] = useState<string>("solana");

  const generateWords = () => {
    const words = generateMnemonic();
    setmnemonic(words);
  };

  const createWallet = async (mnemonic: string) => {
    if (selectWalletType == "solana") {
      const keyPair = await createSolanaWallet(mnemonic, solanaIdx);
      setSolanaIdx(solanaIdx + 1);
      setSolanaWallet([...solanaWallet, keyPair]);
    } else if (selectWalletType == "ethereum") {
      const wallet = await createEthereumWallet(mnemonic, ethereumIdx);
      setEthereumIdx(ethereumIdx + 1);
      setEthereumWallet([...ethereumWallet, wallet]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-center mt-10 text-2xl">Web3 Wallet</h1>
      <div
        className="flex justify-between items-center gap-40 border py-3 px-6 
    rounded-xl my-5 bg-blue-100 text-gray-800"
      >
        <span
          onClick={() => setSelectWalletType("solana")}
          className={`cursor-pointer text-xl ${
            selectWalletType == "solana" ? `underline` : "hover:underline"
          }`}
        >
          Solana
        </span>
        <span
          onClick={() => setSelectWalletType("ethereum")}
          className={`cursor-pointer text-xl ${
            selectWalletType == "ethereum" ? `underline` : "hover:underline"
          }`}
        >
          Ethereum
        </span>
      </div>
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
            onClick={() => createWallet(mnemonic)}
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
        {selectWalletType == "solana" ? (
          <SolanaWallet wallet={solanaWallet} />
        ) : (
          <EthereumWallet wallet={ethereumWallet} />
        )}
      </div>
    </div>
  );
}
