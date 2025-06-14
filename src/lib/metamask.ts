export const signMessage = async (message: string) => {
  if (!window.ethereum) throw new Error("MetaMask not available");
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const from = accounts[0];
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, from],
  });
  return signature;
};
