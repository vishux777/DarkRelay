// Simple crypto implementation for anonymous ID generation
// Note: This is a simplified version - in production, you'd use a proper crypto library

function generateRandomBytes(length) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return array;
}

function bytesToHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function generateKeyPair() {
  // Generate random keys (simplified - in production use proper curve25519/ed25519)
  const privateKey = generateRandomBytes(32);
  const publicKey = generateRandomBytes(32);
  
  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey)
  };
}

function generateUserId(publicKey) {
  // Create user ID from public key hash
  const encoder = new TextEncoder();
  const data = encoder.encode(publicKey);
  
  return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
    const hashArray = new Uint8Array(hashBuffer);
    return bytesToHex(hashArray.slice(0, 16)); // Use first 16 bytes for shorter ID
  });
}

export async function POST(request) {
  try {
    // Generate new key pair
    const keyPair = generateKeyPair();
    
    // Generate user ID from public key
    const userId = await generateUserId(keyPair.publicKey);
    
    // Return the generated keys and user ID
    return Response.json({
      userId: userId,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
      generated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generating ID:', error);
    return Response.json(
      { error: 'Failed to generate anonymous ID' },
      { status: 500 }
    );
  }
}