const CryptoJS = require('crypto-js');

// encryption
export const encrypt = async (text: any) => {
  const SECRET_KEY = process.env.API_SECRET;
  const ciphertext = CryptoJS.AES.encrypt(text, "hfhsec12re%ct455_HFHEB54783597865$?kebfsbNFNDNOFJOIDWFNV_IBUFW$452nfciebdckdwnijcnew").toString();
  return ciphertext;
}


