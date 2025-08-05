import { mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export const createEthereumWallet = async (
  mnemonic: string,
  etherumIdx: number
) => {
  if (mnemonic == "") {
    alert("Please generate seed phrase before creating wallet!");
  }
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/60'/${etherumIdx}'/0`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  return wallet;
};
