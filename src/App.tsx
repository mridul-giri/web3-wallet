import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";

export default function App() {
  const [mnemonic, setmnemonic] = useState("");

  return <div className="text-center mt-10 text-2xl">Web3 Wallet</div>;
}
