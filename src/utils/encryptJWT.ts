/**
 * Utility functions for encrypting and decrypting JWT tokens
 * Uses the Web Crypto API for secure encryption
 */

/**
 * Converts string to Uint8Array
 */
function stringToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Converts Uint8Array to base64 string
 */
function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

/**
 * Converts base64 string to Uint8Array
 */
function base64ToBuffer(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Safely access localStorage with fallbacks for non-browser environments
 */
function safeStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }

  // Fallback mock storage for SSR
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

/**
 * Generates or retrieves encryption key from storage
 */
async function getOrCreateEncryptionKey(): Promise<CryptoKey> {
  const storage = safeStorage();
  // Check if we have a stored key
  const storedKey = storage.getItem("jwt_encryption_key");

  if (storedKey) {
    // Import the existing key
    const keyData = base64ToBuffer(storedKey);
    return crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false, // not extractable
      ["encrypt", "decrypt"]
    );
  }

  // Generate a new key if none exists
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable
    ["encrypt", "decrypt"]
  );

  // Export and store the key for future use
  const exportedKey = await crypto.subtle.exportKey("raw", key);
  storage.setItem("jwt_encryption_key", bufferToBase64(exportedKey));

  return key;
}

/**
 * Encrypts a JWT token
 * @param token - The JWT token to encrypt
 * @returns A promise that resolves to the encrypted token as a base64 string
 */
export async function encryptJWT(token: string): Promise<string> {
  try {
    const key = await getOrCreateEncryptionKey();

    // Create initialization vector (IV)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the token
    const tokenBuffer = stringToBuffer(token);
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      tokenBuffer
    );

    // Combine IV and encrypted data and convert to base64
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    return bufferToBase64(combined.buffer);
  } catch (error) {
    console.error("Error encrypting JWT token:", error);
    throw new Error("Failed to encrypt JWT token");
  }
}

/**
 * Decrypts an encrypted JWT token
 * @param encryptedToken - The encrypted token as a base64 string
 * @returns A promise that resolves to the decrypted JWT token
 */
export async function decryptJWT(encryptedToken: string): Promise<string> {
  try {
    const key = await getOrCreateEncryptionKey();

    // Decode base64 to get combined IV and data
    const combined = base64ToBuffer(encryptedToken);

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    // Decrypt the token
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error("Error decrypting JWT token:", error);
    throw new Error("Failed to decrypt JWT token");
  }
}

/**
 * Securely stores a JWT token by encrypting it first
 * @param token - The JWT token to store
 */
export async function securelyStoreJWT(token: string): Promise<void> {
  const encryptedToken = await encryptJWT(token);
  safeStorage().setItem("encrypted_jwt", encryptedToken);
}

/**
 * Retrieves and decrypts a stored JWT token
 * @returns A promise that resolves to the decrypted JWT token or null if not found
 */
export async function retrieveSecureJWT(): Promise<string | null> {
  const encryptedToken = safeStorage().getItem("encrypted_jwt");
  if (!encryptedToken) {
    return null;
  }

  return decryptJWT(encryptedToken);
}
