// Simple encryption utility using Web Crypto API
// In production, consider using a more robust solution with proper key management

const ENCRYPTION_KEY = 'student-portal-encryption-key-2024';

export async function encryptData(text: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Create a key from the encryption key string
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(ENCRYPTION_KEY),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive an encryption key
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt-value'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);
    
    // Convert to base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    console.error('Encryption error:', error);
    return text; // Fallback to plain text if encryption fails
  }
}

export async function decryptData(encryptedText: string): Promise<string> {
  if (!encryptedText) {
    return encryptedText;
  }
  
  // Check if the text is already plain text (not base64 encoded)
  // Base64 only contains A-Z, a-z, 0-9, +, /, and = characters
  const base64Pattern = /^[A-Za-z0-9+/]+=*$/;
  if (!base64Pattern.test(encryptedText)) {
    // It's plain text, return as is
    return encryptedText;
  }
  
  try {
    const encoder = new TextEncoder();
    
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    
    // Create a key from the encryption key string
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(ENCRYPTION_KEY),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive the decryption key
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt-value'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText; // Fallback to returning original if decryption fails
  }
}
