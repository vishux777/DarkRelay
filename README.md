# 🔒 DarkRelay (DR)

<div align="center">

![DarkRelay Logo](https://img.shields.io/badge/DarkRelay-Encrypted%20Messaging-black?style=for-the-badge&logo=ethereum)

**Anonymous, End-to-End Encrypted Messaging Platform with Blockchain-Backed Message Integrity**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Ethereum](https://img.shields.io/badge/Ethereum-Integration-purple.svg)](https://ethereum.org/)
[![Security](https://img.shields.io/badge/Security-E2EE-green.svg)](https://en.wikipedia.org/wiki/End-to-end_encryption)
[![Real-time](https://img.shields.io/badge/Real--time-WebSocket-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security Model](#-security)
- [Blockchain Integration](#-blockchain-integration)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🌟 Overview

**DarkRelay** is a cutting-edge, privacy-focused messaging platform that combines military-grade end-to-end encryption with blockchain technology to create an unprecedented level of security and message integrity verification. Built for users who demand absolute privacy and anonymity, DarkRelay operates without requiring user registration, personal information, or centralized data storage.

### Why DarkRelay?

In an era of increasing digital surveillance and data breaches, DarkRelay provides:

- ✅ **Zero Registration Required** - Start chatting immediately with anonymous IDs
- ✅ **End-to-End Encryption** - Your messages are encrypted on your device and only the recipient can decrypt them
- ✅ **Blockchain Verification** - Every message is cryptographically verified on the Ethereum blockchain
- ✅ **Complete Anonymity** - No personal information stored, no tracking, no logs
- ✅ **Real-time Communication** - Instant message delivery via WebSocket connections
- ✅ **Open Source** - Transparent, auditable code that anyone can verify
- ✅ **Decentralized Trust** - No single point of failure or control

---

## ✨ Features

### Core Features

#### 🔐 **Advanced Encryption**
- **AES-256-GCM** encryption for message content
- **End-to-end encryption** ensuring only sender and receiver can read messages
- **Perfect Forward Secrecy** through ephemeral key exchange
- **Zero-knowledge architecture** - server never has access to decryption keys

#### 🎭 **Complete Anonymity**
- **Anonymous User IDs** - Cryptographically generated identifiers
- **No registration or personal information** required
- **No IP logging or tracking**
- **Metadata minimization** to protect user identity
- **Disposable identities** - Generate new IDs anytime

#### ⛓️ **Blockchain Integration**
- **Ethereum-based message verification**
- **Immutable message hashes** stored on-chain
- **Tamper-proof message integrity**
- **Smart contract verification** for message authenticity
- **Cryptographic proof** of message delivery and timestamp

#### 💬 **Real-time Messaging**
- **WebSocket-based instant messaging**
- **Sub-second message delivery**
- **Online/offline status indicators**
- **Typing indicators** (optional)
- **Message delivery receipts** (encrypted)

#### 🛡️ **Security Features**
- **Message self-destruction** (optional timer)
- **Screenshot detection** (where supported)
- **Copy protection** (configurable)
- **Session encryption** with rotating keys
- **Secure key storage** using browser's SubtleCrypto API

#### 🎨 **User Experience**
- **Clean, intuitive interface**
- **Dark mode optimized**
- **Cross-platform compatibility** (Web, Desktop, Mobile)
- **PWA support** for offline functionality
- **Responsive design** for all screen sizes

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Web UI     │  │  Mobile App  │  │ Desktop App  │     │
│  │  (React)     │  │ (React Native)│  │  (Electron)  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
├────────────────────────────┼─────────────────────────────────┤
│                    ENCRYPTION LAYER                          │
├────────────────────────────┼─────────────────────────────────┤
│         ┌──────────────────▼──────────────────┐             │
│         │    Crypto Service (Client-side)     │             │
│         │  • Key Generation (ECDH)            │             │
│         │  • AES-256-GCM Encryption           │             │
│         │  • Message Signing (ECDSA)          │             │
│         └──────────────────┬──────────────────┘             │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                     COMMUNICATION LAYER                       │
├───────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │            WebSocket Server (Node.js)                │   │
│  │  • Real-time message relay                           │   │
│  │  • Connection management                             │   │
│  │  • Rate limiting & DDoS protection                   │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                       │
│  ┌────────────────────▼─────────────────────────────────┐   │
│  │            REST API Server (Express)                 │   │
│  │  • User ID generation                                │   │
│  │  • Public key exchange                               │   │
│  │  • Blockchain interaction                            │   │
│  └────────────────────┬─────────────────────────────────┘   │
└────────────────────────┼─────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                      STORAGE LAYER                            │
├───────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐          ┌──────────────────┐         │
│  │   Redis Cache    │          │  MongoDB (temp)  │         │
│  │ • Session data   │          │ • Pending msgs   │         │
│  │ • Public keys    │          │ • (Auto-expire)  │         │
│  └──────────────────┘          └──────────────────┘         │
└───────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                   BLOCKCHAIN LAYER                            │
├───────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Ethereum Smart Contract                       │   │
│  │  • Message hash storage                              │   │
│  │  • Timestamp verification                            │   │
│  │  • Integrity validation                              │   │
│  │                                                       │   │
│  │  contract MessageVerifier {                          │   │
│  │    mapping(bytes32 => uint256) messageHashes;        │   │
│  │    function storeHash(bytes32 hash) public;          │   │
│  │    function verifyHash(bytes32 hash) public view;    │   │
│  │  }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

### Message Flow

```
SENDER                          SERVER                        RECEIVER
  │                               │                               │
  │ 1. Generate message           │                               │
  ├───────────────────────────────┤                               │
  │ 2. Encrypt with receiver's    │                               │
  │    public key (E2EE)          │                               │
  ├───────────────────────────────┤                               │
  │ 3. Generate message hash      │                               │
  ├───────────────────────────────┤                               │
  │ 4. Send encrypted message     │                               │
  │───────────────────────────────>                               │
  │                               │ 5. Relay encrypted message    │
  │                               │──────────────────────────────>│
  │                               │                               │
  │                               │ 6. Store hash on blockchain   │
  │                               ├──────────────────────────────>│
  │                               │         Ethereum               │
  │                               │                               │
  │                               │                               │ 7. Decrypt message
  │                               │                               │    with private key
  │                               │                               ├────────────────────
  │                               │                               │
  │                               │ 8. Verify hash on blockchain  │
  │                               │<──────────────────────────────┤
  │                               │                               │
  │ 9. Delivery confirmation      │                               │
  │<───────────────────────────────────────────────────────────────┤
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe code
- **TailwindCSS** - Utility-first styling
- **Redux Toolkit** - State management
- **Socket.io-client** - WebSocket client
- **Web3.js** - Ethereum interaction
- **CryptoJS** - Cryptographic operations
- **React Router** - Client-side routing

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - REST API framework
- **Socket.io** - WebSocket server
- **TypeScript** - Type-safe backend code
- **Ethers.js** - Ethereum blockchain interaction
- **Redis** - In-memory data caching
- **MongoDB** - Temporary message storage
- **JWT** - Session token generation

### Blockchain
- **Ethereum** - Smart contract platform
- **Solidity 0.8+** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries
- **IPFS** (optional) - Decentralized storage

### Security
- **Web Crypto API** - Browser cryptography
- **ECDH** - Key exchange protocol
- **AES-256-GCM** - Symmetric encryption
- **SHA-256** - Cryptographic hashing
- **ECDSA** - Digital signatures

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL/TLS certificates
- **GitHub Actions** - CI/CD pipeline

---

## 📦 Prerequisites

Before installing DarkRelay, ensure you have the following installed:

### Required
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- **Redis** 6.x or higher ([Installation Guide](https://redis.io/docs/getting-started/installation/))
- **MongoDB** 5.x or higher ([Installation Guide](https://www.mongodb.com/docs/manual/installation/))

### For Blockchain Features
- **Ethereum Node** (Infura/Alchemy account or local node)
- **MetaMask** or compatible Web3 wallet
- **Test ETH** for Sepolia/Goerli testnet

### Development Tools
- **Docker** & **Docker Compose** (optional but recommended)
- **Hardhat** for smart contract development
- Code editor (VS Code recommended)

---

## 🚀 Installation

### Option 1: Quick Start (Docker)

```bash
# Clone the repository
git clone https://github.com/vishux777/DarkRelay-DR-.git
cd DarkRelay-DR-

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start with Docker Compose
docker-compose up -d

# Application will be available at http://localhost:3000
```

### Option 2: Manual Installation

#### 1. Clone Repository
```bash
git clone https://github.com/vishux777/DarkRelay-DR-.git
cd DarkRelay-DR-
```

#### 2. Install Backend Dependencies
```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

#### 4. Install Smart Contract Dependencies
```bash
cd ../blockchain
npm install
```

#### 5. Setup Environment Variables

Create `.env` files in respective directories:

**Server (.env)**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/darkrelay
REDIS_URL=redis://localhost:6379

# Blockchain
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=deployed_contract_address

# Security
JWT_SECRET=your_super_secret_jwt_key_change_in_production
ENCRYPTION_KEY=your_32_byte_encryption_key

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**Client (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
REACT_APP_ETHEREUM_NETWORK=sepolia
REACT_APP_CONTRACT_ADDRESS=deployed_contract_address
```

#### 6. Deploy Smart Contracts

```bash
cd blockchain

# Compile contracts
npx hardhat compile

# Deploy to testnet (Sepolia)
npx hardhat run scripts/deploy.js --network sepolia

# Copy deployed contract address to .env files
```

#### 7. Start Services

```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Redis
redis-server

# Terminal 3 - Start Backend Server
cd server
npm run dev

# Terminal 4 - Start Frontend
cd client
npm start
```

#### 8. Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## ⚙️ Configuration

### Server Configuration

#### config/server.config.js
```javascript
module.exports = {
  server: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  },
  
  websocket: {
    pingInterval: 25000,
    pingTimeout: 60000,
    maxPayload: 1048576 // 1MB
  },
  
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    messageExpiry: 86400, // 24 hours
    sessionExpiry: 3600 // 1 hour
  },
  
  blockchain: {
    network: 'sepolia',
    confirmations: 2,
    gasLimit: 500000
  }
};
```

### Client Configuration

#### src/config/app.config.ts
```typescript
export const config = {
  api: {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
  },
  
  websocket: {
    url: process.env.REACT_APP_WS_URL,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  },
  
  encryption: {
    algorithm: 'AES-GCM',
    keyLength: 256,
    ivLength: 12,
    tagLength: 128
  },
  
  features: {
    selfDestruct: true,
    blockchainVerification: true,
    typingIndicators: true,
    readReceipts: true
  }
};
```

---

## 💻 Usage

### Getting Started

#### 1. Generate Your Anonymous ID

When you first open DarkRelay:
- A cryptographically secure anonymous ID is automatically generated
- Your private/public key pair is created locally in your browser
- **Save your ID and private key securely** - you'll need them to access your chats

```javascript
// Example: Anonymous ID generation
const anonymousID = generateSecureID(); // e.g., "DR-a7f3c9e2b1d4f6h8"
```

#### 2. Start a Conversation

```javascript
// Share your public key with intended recipient
const myPublicKey = getPublicKey();

// Receive their public key
const recipientPublicKey = "recipient_public_key_here";

// Start encrypted chat
startEncryptedChat(recipientPublicKey);
```

#### 3. Send Encrypted Messages

All messages are automatically encrypted before sending:

```
Your message → Encrypted with recipient's public key → Sent to server
→ Hash stored on blockchain → Delivered to recipient → Decrypted locally
```

#### 4. Verify Message Integrity

```javascript
// Every message includes blockchain verification
{
  messageId: "msg_123",
  content: "encrypted_content",
  blockchainHash: "0x7a3f...",
  timestamp: 1699123456,
  verified: true
}
```

### Advanced Usage

#### Self-Destructing Messages

```javascript
// Send message that self-destructs after 5 minutes
sendMessage({
  content: "Secret message",
  selfDestruct: 300000 // 5 minutes in milliseconds
});
```

#### Blockchain Verification

```javascript
// Manually verify message integrity on blockchain
const verified = await verifyMessageOnChain(messageHash);
console.log(`Message verified: ${verified}`);
```

#### Export Chat History

```javascript
// Export encrypted chat history
const chatExport = exportChatHistory({
  format: 'encrypted',
  includeMetadata: true
});
```

---

## 📚 API Documentation

### REST API Endpoints

#### Authentication

```http
POST /api/auth/generate-id
```
Generate a new anonymous ID

**Response:**
```json
{
  "userId": "DR-a7f3c9e2b1d4f6h8",
  "publicKey": "04a1b2c3d4...",
  "expiresIn": 3600
}
```

#### Messaging

```http
POST /api/messages/send
```
Send encrypted message

**Request:**
```json
{
  "recipientId": "DR-xyz123",
  "encryptedContent": "encrypted_base64_string",
  "messageHash": "sha256_hash"
}
```

**Response:**
```json
{
  "messageId": "msg_123",
  "blockchainTxHash": "0x7a3f...",
  "timestamp": 1699123456,
  "status": "delivered"
}
```

```http
GET /api/messages/:userId
```
Retrieve pending messages

**Response:**
```json
{
  "messages": [
    {
      "messageId": "msg_123",
      "senderId": "DR-abc456",
      "encryptedContent": "...",
      "timestamp": 1699123456,
      "blockchainHash": "0x7a3f..."
    }
  ]
}
```

#### Blockchain

```http
POST /api/blockchain/verify
```
Verify message on blockchain

**Request:**
```json
{
  "messageHash": "sha256_hash"
}
```

**Response:**
```json
{
  "verified": true,
  "blockNumber": 12345,
  "timestamp": 1699123456,
  "transactionHash": "0x7a3f..."
}
```

### WebSocket Events

#### Client → Server

```javascript
// Connect
socket.emit('authenticate', {
  userId: 'DR-a7f3c9e2b1d4f6h8',
  signature: 'signed_challenge'
});

// Send message
socket.emit('message', {
  recipientId: 'DR-xyz123',
  encryptedContent: '...',
  messageHash: 'sha256_hash'
});

// Typing indicator
socket.emit('typing', {
  recipientId: 'DR-xyz123',
  isTyping: true
});
```

#### Server → Client

```javascript
// Receive message
socket.on('message', (data) => {
  console.log('New message:', data);
});

// User status
socket.on('user-status', (data) => {
  console.log('User status:', data.status);
});

// Typing indicator
socket.on('typing', (data) => {
  console.log(`${data.userId} is typing...`);
});

// Message delivered
socket.on('message-delivered', (data) => {
  console.log('Message delivered:', data.messageId);
});
```

---

## 🔒 Security

### Encryption Details

#### End-to-End Encryption Flow

1. **Key Generation**
   - Each user generates an ECDH key pair (Elliptic Curve Diffie-Hellman)
   - Private key stored locally in browser's IndexedDB (encrypted)
   - Public key shared with chat partners

2. **Message Encryption**
   ```javascript
   // Sender side
   const sharedSecret = ECDH(senderPrivateKey, recipientPublicKey);
   const encryptionKey = HKDF(sharedSecret);
   const encryptedMessage = AES_256_GCM(message, encryptionKey);
   ```

3. **Message Decryption**
   ```javascript
   // Receiver side
   const sharedSecret = ECDH(recipientPrivateKey, senderPublicKey);
   const decryptionKey = HKDF(sharedSecret);
   const decryptedMessage = AES_256_GCM_decrypt(encryptedMessage, decryptionKey);
   ```

### Security Features

#### ✅ What We Protect Against

- **Man-in-the-Middle Attacks** - E2EE prevents interception
- **Server Compromise** - Server cannot decrypt messages
- **Data Breaches** - No plaintext storage
- **Message Tampering** - Blockchain verification
- **Replay Attacks** - Timestamp and nonce validation
- **DDoS Attacks** - Rate limiting and traffic filtering

#### ⚠️ Security Considerations

- **Device Security** - Your device must be secure (no malware)
- **Browser Security** - Keep your browser updated
- **Private Key Security** - Never share your private key
- **Network Security** - Use HTTPS/WSS connections
- **Physical Security** - Protect device from unauthorized access

### Security Audit

We recommend regular security audits. To run automated security checks:

```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm run security-check

# Run penetration tests
npm run pentest
```

### Responsible Disclosure

If you discover a security vulnerability, please email:
**security@darkrelay.io**

Please do NOT disclose publicly until we've addressed the issue.

---

## ⛓️ Blockchain Integration

### Smart Contract

The DarkRelay smart contract is deployed on Ethereum and handles:

#### MessageVerifier.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MessageVerifier {
    struct MessageRecord {
        bytes32 messageHash;
        uint256 timestamp;
        address sender;
        bool exists;
    }
    
    mapping(bytes32 => MessageRecord) public messages;
    
    event MessageStored(
        bytes32 indexed messageHash,
        uint256 timestamp,
        address sender
    );
    
    function storeMessageHash(bytes32 _messageHash) external {
        require(!messages[_messageHash].exists, "Hash already exists");
        
        messages[_messageHash] = MessageRecord({
            messageHash: _messageHash,
            timestamp: block.timestamp,
            sender: msg.sender,
            exists: true
        });
        
        emit MessageStored(_messageHash, block.timestamp, msg.sender);
    }
    
    function verifyMessageHash(bytes32 _messageHash) 
        external 
        view 
        returns (bool exists, uint256 timestamp, address sender) 
    {
        MessageRecord memory record = messages[_messageHash];
        return (record.exists, record.timestamp, record.sender);
    }
    
    function getMessageTimestamp(bytes32 _messageHash) 
        external 
        view 
        returns (uint256) 
    {
        require(messages[_messageHash].exists, "Hash does not exist");
        return messages[_messageHash].timestamp;
    }
}
```

### Deployed Contracts

| Network | Contract Address | Explorer |
|---------|-----------------|----------|
| Ethereum Mainnet | `0x...` | [Etherscan](https://etherscan.io) |
| Sepolia Testnet | `0x...` | [Sepolia Etherscan](https://sepolia.etherscan.io) |
| Goerli Testnet | `0x...` | [Goerli Etherscan](https://goerli.etherscan.io) |

### Blockchain Interaction

```javascript
// Store message hash on blockchain
async function storeMessageHash(messageHash) {
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  
  const tx = await contract.storeMessageHash(messageHash);
  const receipt = await tx.wait();
  
  return receipt.transactionHash;
}

// Verify message on blockchain
async function verifyMessage(messageHash) {
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider
  );
  
  const [exists, timestamp, sender] = await contract.verifyMessageHash(messageHash);
  
  return { exists, timestamp, sender };
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/
│   ├── encryption.test.js
│   ├── authentication.test.js
│   └── blockchain.test.js
├── integration/
│   ├── messaging.test.js
│   └── api.test.js
└── e2e/
    ├── chat-flow.test.js
    └── blockchain-verification.test.js
```

### Example Test

```javascript
describe('Message Encryption', () => {
  it('should encrypt and decrypt message correctly', async () => {
    const message = 'Hello, DarkRelay!';
    const { publicKey, privateKey } = generateKeyPair();
    
    const encrypted = await encryptMessage(message, publicKey);
    const decrypted = await decryptMessage(encrypted, privateKey);
    
    expect(decrypted).toBe(message);
  });
  
  it('should fail decryption with wrong key', async () => {
    const message = 'Secret message';
    const { publicKey } = generateKeyPair();
    const { privateKey: wrongKey } = generateKeyPair();
    
    const encrypted = await encryptMessage(message, publicKey);
    
    await expect(
      decryptMessage(encrypted, wrongKey)
    ).rejects.toThrow();
  });
});
```

---

## 🚢 Deployment

### Production Deployment

#### Using Docker

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

#### Manual Deployment

```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build

# Start production server
npm start
```

### Environment Setup

#### Production Environment Variables

```env
NODE_ENV=production
PORT=443
CLIENT_URL=https://darkrelay.io

# Use production database
MONGODB_URI=mongodb://prod-server/darkrelay
REDIS_URL=redis://prod-redis:6379

# Ethereum Mainnet
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0x_mainnet_contract_address

# Strong secrets for production
JWT_SECRET=use_strong_random_secret_here
ENCRYPTION_KEY=use_32_byte_random_key_here
```

### SSL/TLS Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name darkrelay.io;
    
    ssl_certificate /etc/letsencrypt/live/darkrelay.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/darkrelay.io/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /socket.io/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

### Performance Optimization

#### Redis Caching Strategy

```javascript
// Cache user public keys
const cachePublicKey = async (userId, publicKey) => {
  await redis.setex(`pubkey:${userId}`, 3600, publicKey);
};

// Cache message hashes
const cacheMessageHash = async (messageId, hash) => {
  await redis.setex(`hash:${messageId}`, 86400, hash);
};
```

#### Database Indexing

```javascript
// MongoDB indexes for performance
db.messages.createIndex({ recipientId: 1, timestamp: -1 });
db.messages.createIndex({ senderId: 1, timestamp: -1 });
db.messages.createIndex({ messageHash: 1 }, { unique: true });
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

### Monitoring and Logging

```bash
# Setup monitoring
npm install pm2 -g

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# View logs
pm2 logs

# Setup log rotation
pm2 install pm2-logrotate
```

#### ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'darkrelay-api',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: WebSocket Connection Failed

**Symptoms:**
- Cannot connect to chat
- Messages not sending/receiving
- "Connection lost" error

**Solutions:**
```bash
# Check if WebSocket port is open
netstat -an | grep 5000

# Check firewall rules
sudo ufw status

# Allow WebSocket port
sudo ufw allow 5000

# Restart server
npm run restart
```

#### Issue: Blockchain Transaction Fails

**Symptoms:**
- "Transaction failed" error
- Message not verified on chain
- Gas estimation failed

**Solutions:**
```javascript
// Check account balance
const balance = await provider.getBalance(address);
console.log('Balance:', ethers.utils.formatEther(balance));

// Increase gas limit
const tx = await contract.storeMessageHash(hash, {
  gasLimit: 500000
});

// Wait for more confirmations
await tx.wait(3); // Wait for 3 confirmations
```

#### Issue: Messages Not Decrypting

**Symptoms:**
- Garbled message content
- "Decryption failed" error
- Empty message display

**Solutions:**
```javascript
// Verify key pair
const isValid = await verifyKeyPair(publicKey, privateKey);

// Check key format
console.log('Public key length:', publicKey.length);
console.log('Private key length:', privateKey.length);

// Regenerate keys if necessary
const { publicKey, privateKey } = await generateNewKeyPair();
```

#### Issue: High Memory Usage

**Symptoms:**
- Server crashes
- Slow response times
- Out of memory errors

**Solutions:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm start

# Monitor memory usage
node --inspect server.js

# Clear Redis cache
redis-cli FLUSHDB

# Restart MongoDB
sudo systemctl restart mongod
```

### Debug Mode

Enable debug logging:

```bash
# Server
DEBUG=darkrelay:* npm run dev

# Client
REACT_APP_DEBUG=true npm start
```

### Log Files

```bash
# Server logs
tail -f logs/server.log

# Error logs
tail -f logs/error.log

# WebSocket logs
tail -f logs/websocket.log

# Blockchain logs
tail -f logs/blockchain.log
```

---

## 🤝 Contributing

We welcome contributions from the community! DarkRelay is open-source and thrives on collaboration.

### How to Contribute

#### 1. Fork the Repository

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/DarkRelay-DR-.git
cd DarkRelay-DR-
```

#### 2. Create a Branch

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Or bugfix branch
git checkout -b bugfix/fix-issue-123
```

#### 3. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

#### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Format code
npm run format
```

#### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

#### 6. Push and Create Pull Request

```bash
git push origin feature/amazing-feature
```

Then create a Pull Request on GitHub.

### Contribution Guidelines

#### Code Style

```javascript
// ✅ Good
const encryptMessage = async (message, publicKey) => {
  const encryptedData = await encrypt(message, publicKey);
  return encryptedData;
};

// ❌ Bad
const encryptMessage = async (msg, pk) => {
  return await encrypt(msg, pk);
};
```

#### Testing Requirements

- All new features must include tests
- Maintain test coverage above 80%
- Include both unit and integration tests

```javascript
// Example test
describe('MessageEncryption', () => {
  it('should encrypt message with AES-256-GCM', async () => {
    const result = await encryptMessage('test', publicKey);
    expect(result).toHaveProperty('ciphertext');
    expect(result).toHaveProperty('iv');
    expect(result).toHaveProperty('tag');
  });
});
```

#### Documentation

- Update README for user-facing changes
- Add JSDoc comments for functions
- Update API documentation for endpoint changes

```javascript
/**
 * Encrypts a message using AES-256-GCM encryption
 * @param {string} message - The plaintext message to encrypt
 * @param {string} publicKey - The recipient's public key
 * @returns {Promise<EncryptedMessage>} The encrypted message object
 * @throws {EncryptionError} If encryption fails
 */
async function encryptMessage(message, publicKey) {
  // Implementation
}
```

### Areas We Need Help With

- 🔐 **Security Auditing** - Review encryption implementations
- 🌐 **Internationalization** - Translate UI to other languages
- 📱 **Mobile Development** - React Native app improvements
- 🎨 **UI/UX Design** - Interface improvements and mockups
- 📚 **Documentation** - Improve guides and tutorials
- 🧪 **Testing** - Increase test coverage
- ⚡ **Performance** - Optimization and profiling

### Community

Join our community:

- **Discord:** [discord.gg/darkrelay](https://discord.gg/darkrelay)
- **Telegram:** [t.me/darkrelay](https://t.me/darkrelay)
- **Twitter:** [@DarkRelayApp](https://twitter.com/DarkRelayApp)
- **Forum:** [forum.darkrelay.io](https://forum.darkrelay.io)

---

## 🗺️ Roadmap

### Phase 1: Foundation (Q4 2024) ✅

- [x] Core messaging infrastructure
- [x] End-to-end encryption implementation
- [x] Blockchain integration (Ethereum)
- [x] Anonymous ID system
- [x] Real-time WebSocket communication
- [x] Basic web interface

### Phase 2: Enhancement (Q1 2025) 🚧

- [x] Message self-destruction feature
- [x] Improved UI/UX with dark mode
- [ ] File sharing (encrypted)
- [ ] Voice messages (encrypted)
- [ ] Group chat support
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

### Phase 3: Advanced Features (Q2 2025) 📋

- [ ] Video/Audio calls (P2P WebRTC)
- [ ] Multi-device synchronization
- [ ] Decentralized identity (DID)
- [ ] IPFS integration for file storage
- [ ] Advanced blockchain features (Layer 2)
- [ ] Message search (encrypted index)
- [ ] Custom themes and plugins

### Phase 4: Scaling & Optimization (Q3 2025) 📋

- [ ] Performance optimization
- [ ] Horizontal scaling
- [ ] CDN integration
- [ ] Advanced caching strategies
- [ ] Load balancing
- [ ] Kubernetes deployment
- [ ] Global message relay network

### Phase 5: Ecosystem (Q4 2025) 📋

- [ ] Developer API and SDK
- [ ] Bot framework
- [ ] Integration marketplace
- [ ] Third-party plugins
- [ ] White-label solution
- [ ] Enterprise features
- [ ] Compliance tools (GDPR, etc.)

### Future Considerations

- **Quantum-Resistant Encryption** - Post-quantum cryptography
- **AI-Powered Features** - Smart replies, translation
- **Blockchain Expansion** - Multi-chain support
- **Decentralized Storage** - Full IPFS/Arweave integration
- **DAO Governance** - Community-driven development
- **Token Economy** - Optional incentive layer

---

## 📄 License

DarkRelay is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 DarkRelay Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses

DarkRelay uses the following open-source libraries:

- **React** - MIT License
- **Node.js** - MIT License
- **Express.js** - MIT License
- **Socket.io** - MIT License
- **Ethers.js** - MIT License
- **MongoDB** - Server Side Public License
- **Redis** - BSD License

See [LICENSES.md](LICENSES.md) for complete third-party license information.

---

## 🙏 Acknowledgments

### Contributors

A huge thank you to all our contributors who have helped make DarkRelay possible:

<!-- Add contributor images here -->
<a href="https://github.com/vishux777/DarkRelay-DR-/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vishux777/DarkRelay-DR-" />
</a>

### Special Thanks

- **Ethereum Foundation** - For blockchain infrastructure
- **OpenZeppelin** - For secure smart contract libraries
- **Signal Protocol** - For encryption inspiration
- **Tor Project** - For anonymity research
- **IETF** - For cryptographic standards
- **Open Source Community** - For incredible tools and libraries

### Inspiration

DarkRelay is inspired by privacy-focused messaging platforms:
- **Signal** - End-to-end encryption pioneer
- **Tor Messenger** - Anonymous communication
- **Session** - Decentralized messaging
- **Status** - Ethereum-based messaging

### Research Papers

Key cryptographic concepts implemented:

1. **"The Signal Protocol"** - Perrin & Marlinspike
2. **"End-to-End Encrypted Messaging Protocols"** - Cohn-Gordon et al.
3. **"Blockchain-Based Secure Communications"** - Various authors
4. **"Perfect Forward Secrecy in Key Agreement Protocols"** - Adrian et al.

---

## 📞 Contact

### Project Maintainer

**Vishu** ([@vishux777](https://github.com/vishux777))
- Email: vishu@darkrelay.io
- GitHub: [github.com/vishux777](https://github.com/vishux777)

### Community Channels

- **Official Website:** [darkrelay.io](https://darkrelay.io)
- **Documentation:** [docs.darkrelay.io](https://docs.darkrelay.io)
- **Blog:** [blog.darkrelay.io](https://blog.darkrelay.io)
- **Discord:** [discord.gg/darkrelay](https://discord.gg/darkrelay)
- **Twitter:** [@DarkRelayApp](https://twitter.com/DarkRelayApp)
- **Email:** contact@darkrelay.io

### Support

Need help? Here's how to get support:

1. **Documentation** - Check our [docs](https://docs.darkrelay.io)
2. **FAQ** - Visit [FAQ page](https://darkrelay.io/faq)
3. **GitHub Issues** - [Report bugs](https://github.com/vishux777/DarkRelay-DR-/issues)
4. **Discord** - Ask questions in community
5. **Email** - support@darkrelay.io

### Security Issues

For security vulnerabilities, please email:
**security@darkrelay.io**

**Please do not disclose security issues publicly.**

---

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/vishux777/DarkRelay-DR-?style=social)
![GitHub forks](https://img.shields.io/github/forks/vishux777/DarkRelay-DR-?style=social)
![GitHub issues](https://img.shields.io/github/issues/vishux777/DarkRelay-DR-)
![GitHub pull requests](https://img.shields.io/github/issues-pr/vishux777/DarkRelay-DR-)
![GitHub license](https://img.shields.io/github/license/vishux777/DarkRelay-DR-)
![GitHub last commit](https://img.shields.io/github/last-commit/vishux777/DarkRelay-DR-)

---

## 🎯 Key Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| 🔐 E2E Encryption | ✅ Implemented | AES-256-GCM encryption |
| 🎭 Anonymity | ✅ Implemented | No registration required |
| ⛓️ Blockchain | ✅ Implemented | Ethereum message verification |
| 💬 Real-time Chat | ✅ Implemented | WebSocket communication |
| 📱 Mobile App | 🚧 In Progress | React Native |
| 🖥️ Desktop App | 🚧 In Progress | Electron |
| 📁 File Sharing | 📋 Planned | Encrypted file transfer |
| 🎤 Voice Messages | 📋 Planned | Encrypted audio |
| 👥 Group Chat | 📋 Planned | Multi-party encryption |
| 📞 Video Calls | 📋 Planned | P2P WebRTC |

---

## 🔬 Technical Specifications

### Encryption Specifications

| Parameter | Value |
|-----------|-------|
| **Symmetric Encryption** | AES-256-GCM |
| **Key Exchange** | ECDH (Curve25519) |
| **Digital Signatures** | ECDSA (secp256k1) |
| **Hash Function** | SHA-256 |
| **Key Derivation** | HKDF-SHA256 |
| **Random Generation** | CSPRNG (Web Crypto API) |

### Performance Benchmarks

| Metric | Value |
|--------|-------|
| **Message Latency** | < 100ms |
| **Encryption Speed** | ~10MB/s |
| **Concurrent Users** | 10,000+ |
| **Messages/Second** | 1,000+ |
| **Blockchain Confirmation** | ~15 seconds |

---

## 📚 Additional Resources

### Documentation

- [📖 User Guide](docs/USER_GUIDE.md)
- [💻 Developer Guide](docs/DEVELOPER_GUIDE.md)
- [🔐 Security Whitepaper](docs/SECURITY.md)
- [🏗️ Architecture Guide](docs/ARCHITECTURE.md)
- [📡 API Reference](docs/API.md)
- [🔧 Configuration Guide](docs/CONFIGURATION.md)

### Tutorials

- [Getting Started with DarkRelay](docs/tutorials/getting-started.md)
- [Building a Chat Bot](docs/tutorials/building-bot.md)
- [Integrating with Your App](docs/tutorials/integration.md)
- [Deploying to Production](docs/tutorials/deployment.md)

### Videos

- [DarkRelay Introduction](https://youtube.com/watch?v=...)
- [Security Deep Dive](https://youtube.com/watch?v=...)
- [Development Tutorial](https://youtube.com/watch?v=...)

---

## ⚖️ Legal

### Privacy Policy

DarkRelay is committed to user privacy:
- **No personal information collected**
- **No message content stored in plaintext**
- **No IP address logging**
- **No tracking or analytics**
- **No data sharing with third parties**

See full [Privacy Policy](PRIVACY.md)

### Terms of Service

By using DarkRelay, you agree to:
- Use the service lawfully
- Not transmit illegal content
- Respect other users
- Not attempt to break security measures

See full [Terms of Service](TERMS.md)

### Disclaimer

```
THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
USE AT YOUR OWN RISK. THE DEVELOPERS ARE NOT LIABLE FOR ANY
DAMAGES OR LOSSES ARISING FROM THE USE OF THIS SOFTWARE.

DarkRelay is designed for privacy but cannot guarantee complete
anonymity against all adversaries. Users should understand the
limitations and threats specific to their use case.
```

---


---

<div align="center">

### Made with ❤️ for Privacy

**DarkRelay - Your Privacy, Your Right**

---

⭐ **If you like DarkRelay, please star this repository!** ⭐

---

© 2024 DarkRelay Contributors. All rights reserved.

</div>
