import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY || 'default_fallback_key';


export const encryptData = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
  } catch (e) {
    console.error("Encryption error:", e);
    return null;
  }
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error("Failed to decrypt. Possibly wrong key or corrupted data.");
    }

    return decrypted;
  } catch (e) {
    console.error("Decryption error:", e);
    return null;
  }
};