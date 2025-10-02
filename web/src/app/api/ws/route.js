// WebSocket server for real-time messaging
// Note: This is a simplified implementation for demo purposes

const connectedUsers = new Map(); // userId -> { ws, userInfo }
const userSessions = new Map(); // ws -> userInfo

function broadcastToUser(userId, message) {
  const userSession = connectedUsers.get(userId);
  if (userSession && userSession.ws.readyState === 1) { // OPEN
    try {
      userSession.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending message to user:', error);
      // Remove disconnected user
      connectedUsers.delete(userId);
      userSessions.delete(userSession.ws);
    }
  }
}

function broadcastOnlineUsers() {
  const onlineUsers = Array.from(connectedUsers.values()).map(session => ({
    userId: session.userInfo.userId,
    publicKey: session.userInfo.publicKey,
    status: 'online',
    lastSeen: new Date().toISOString()
  }));

  const message = {
    type: 'online_users',
    users: onlineUsers
  };

  // Broadcast to all connected users
  for (const [userId, session] of connectedUsers) {
    try {
      if (session.ws.readyState === 1) { // OPEN
        session.ws.send(JSON.stringify(message));
      }
    } catch (error) {
      console.error('Error broadcasting to user:', userId, error);
      connectedUsers.delete(userId);
      userSessions.delete(session.ws);
    }
  }
}

function handleMessage(ws, data) {
  try {
    const message = JSON.parse(data);
    const userInfo = userSessions.get(ws);

    switch (message.type) {
      case 'auth':
        // Authenticate user
        const newUserInfo = {
          userId: message.userId,
          publicKey: message.publicKey,
          connectedAt: new Date().toISOString()
        };
        
        userSessions.set(ws, newUserInfo);
        connectedUsers.set(message.userId, { ws, userInfo: newUserInfo });
        
        console.log('User authenticated:', message.userId);
        
        // Broadcast updated online users list
        broadcastOnlineUsers();
        
        // Send user joined notification to others
        for (const [otherUserId, session] of connectedUsers) {
          if (otherUserId !== message.userId && session.ws.readyState === 1) {
            session.ws.send(JSON.stringify({
              type: 'user_joined',
              user: {
                userId: newUserInfo.userId,
                publicKey: newUserInfo.publicKey,
                status: 'online'
              }
            }));
          }
        }
        break;

      case 'send_message':
        if (!userInfo) {
          ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated' }));
          return;
        }

        // For now, send messages as plain text
        // TODO: Add encryption and blockchain verification
        const messageId = Date.now().toString();
        const timestamp = new Date().toISOString();
        
        // Send message to recipient
        const recipientSession = connectedUsers.get(message.recipientId);
        if (recipientSession && recipientSession.ws.readyState === 1) {
          recipientSession.ws.send(JSON.stringify({
            type: 'new_message',
            messageId: messageId,
            senderId: userInfo.userId,
            recipientId: message.recipientId,
            content: message.content,
            encryptedMessage: message.content, // TODO: Add actual encryption
            timestamp: timestamp,
            messageHash: null, // TODO: Add message hash
            blockchainTx: null // TODO: Add blockchain transaction
          }));
        }

        // Send confirmation back to sender
        ws.send(JSON.stringify({
          type: 'message_sent',
          messageId: messageId,
          recipientId: message.recipientId,
          timestamp: timestamp
        }));
        break;

      case 'ping':
        ws.send(JSON.stringify({ type: 'pong' }));
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  } catch (error) {
    console.error('Error handling message:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
  }
}

function handleDisconnect(ws) {
  const userInfo = userSessions.get(ws);
  if (userInfo) {
    console.log('User disconnected:', userInfo.userId);
    
    // Remove from maps
    connectedUsers.delete(userInfo.userId);
    userSessions.delete(ws);
    
    // Broadcast user left notification
    for (const [userId, session] of connectedUsers) {
      if (session.ws.readyState === 1) {
        session.ws.send(JSON.stringify({
          type: 'user_left',
          userId: userInfo.userId
        }));
      }
    }
    
    // Broadcast updated online users list
    broadcastOnlineUsers();
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isUpgrade = request.headers.get('upgrade') === 'websocket';
  
  if (!isUpgrade) {
    return Response.json({ 
      error: 'Expected WebSocket connection',
      connectedUsers: connectedUsers.size 
    }, { status: 400 });
  }

  try {
    // Note: This is a simplified WebSocket implementation
    // In a production environment, you'd use a proper WebSocket library
    
    return new Response(null, {
      status: 101,
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Accept': 'mock-accept-key'
      }
    });
  } catch (error) {
    console.error('WebSocket upgrade error:', error);
    return Response.json({ error: 'WebSocket upgrade failed' }, { status: 500 });
  }
}