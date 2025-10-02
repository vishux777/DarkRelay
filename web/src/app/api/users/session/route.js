import sql from "../../utils/sql";

// Manage user sessions for real-time tracking
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, action, sessionToken } = body;

    if (!userId) {
      return Response.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get client info for anonymous tracking
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create simple hashes for anonymous tracking
    const ipHash = btoa(clientIP).substring(0, 32);
    const userAgentHash = btoa(userAgent).substring(0, 32);

    if (action === 'start') {
      // Create new session
      const newSessionToken = btoa(userId + Date.now() + Math.random()).substring(0, 64);
      
      await sql`
        INSERT INTO user_sessions (user_id, session_token, ip_hash, user_agent_hash)
        VALUES (${userId}, ${newSessionToken}, ${ipHash}, ${userAgentHash})
      `;

      // Update user status to online
      await sql`
        UPDATE anonymous_users 
        SET status = 'online', last_seen = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `;

      return Response.json({
        success: true,
        sessionToken: newSessionToken,
        action: 'session_started'
      });

    } else if (action === 'ping') {
      // Update session ping
      if (!sessionToken) {
        return Response.json(
          { error: 'sessionToken is required for ping' },
          { status: 400 }
        );
      }

      await sql`
        UPDATE user_sessions 
        SET last_ping = CURRENT_TIMESTAMP
        WHERE user_id = ${userId} AND session_token = ${sessionToken}
      `;

      // Update user last seen
      await sql`
        UPDATE anonymous_users 
        SET last_seen = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `;

      return Response.json({
        success: true,
        action: 'ping_updated'
      });

    } else if (action === 'end') {
      // End session
      if (sessionToken) {
        await sql`
          DELETE FROM user_sessions 
          WHERE user_id = ${userId} AND session_token = ${sessionToken}
        `;
      } else {
        // End all sessions for this user
        await sql`
          DELETE FROM user_sessions 
          WHERE user_id = ${userId}
        `;
      }

      // Check if user has any remaining sessions
      const remainingSessions = await sql`
        SELECT COUNT(*) as count FROM user_sessions 
        WHERE user_id = ${userId}
      `;

      if (parseInt(remainingSessions[0].count) === 0) {
        // No more sessions, mark user as offline
        await sql`
          UPDATE anonymous_users 
          SET status = 'offline'
          WHERE user_id = ${userId}
        `;
      }

      return Response.json({
        success: true,
        action: 'session_ended'
      });

    } else {
      return Response.json(
        { error: 'Invalid action. Use: start, ping, or end' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error managing session:', error);
    return Response.json(
      { error: 'Failed to manage session' },
      { status: 500 }
    );
  }
}

// Get session info
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sessionToken = searchParams.get('sessionToken');

    if (!userId) {
      return Response.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    let sessions;
    if (sessionToken) {
      sessions = await sql`
        SELECT session_token, last_ping, created_at
        FROM user_sessions 
        WHERE user_id = ${userId} AND session_token = ${sessionToken}
      `;
    } else {
      sessions = await sql`
        SELECT session_token, last_ping, created_at
        FROM user_sessions 
        WHERE user_id = ${userId}
        ORDER BY last_ping DESC
      `;
    }

    return Response.json({
      userId,
      sessions: sessions.map(session => ({
        sessionToken: session.session_token,
        lastPing: session.last_ping,
        createdAt: session.created_at
      })),
      activeSessionCount: sessions.length
    });

  } catch (error) {
    console.error('Error fetching session info:', error);
    return Response.json(
      { error: 'Failed to fetch session info' },
      { status: 500 }
    );
  }
}