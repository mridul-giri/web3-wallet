import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export const createSolanaWallet = async (
  mnemonic: string,
  solanaIdx: number
) => {
  if (mnemonic == "") {
    alert("Please generate seed phrase before creating wallet!");
  }
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${solanaIdx}'/0'`;
  const derivedSeed = derivePath(path, seed.toString()).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);
  return keyPair;
};
