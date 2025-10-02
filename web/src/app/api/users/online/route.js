import sql from "../../utils/sql";

// Get online users from database
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50;
    const countryCode = searchParams.get('country');

    // Clean up old sessions first
    await sql`SELECT cleanup_old_sessions()`;

    // Get online users worldwide
    let users;
    if (countryCode) {
      users = await sql`
        SELECT 
          user_id,
          public_key,
          status,
          last_seen,
          created_at,
          country_code
        FROM anonymous_users 
        WHERE status = 'online' AND country_code = ${countryCode}
        ORDER BY last_seen DESC 
        LIMIT ${limit}
      `;
    } else {
      users = await sql`
        SELECT 
          user_id,
          public_key,
          status,
          last_seen,
          created_at,
          country_code
        FROM anonymous_users 
        WHERE status = 'online'
        ORDER BY last_seen DESC 
        LIMIT ${limit}
      `;
    }

    // Get total online count
    const countResult = await sql`
      SELECT COUNT(*) as total FROM anonymous_users WHERE status = 'online'
    `;
    const totalOnline = parseInt(countResult[0].total);

    // Get geographic distribution
    const geoStats = await sql`
      SELECT 
        country_code,
        COUNT(*) as user_count
      FROM anonymous_users 
      WHERE status = 'online' AND country_code IS NOT NULL
      GROUP BY country_code
      ORDER BY user_count DESC
      LIMIT 10
    `;

    return Response.json({
      users: users.map(user => ({
        userId: user.user_id,
        publicKey: user.public_key,
        status: user.status,
        lastSeen: user.last_seen,
        createdAt: user.created_at,
        countryCode: user.country_code,
        displayName: `User ${user.user_id.slice(0, 8)}`
      })),
      stats: {
        totalOnline,
        showing: users.length,
        geoDistribution: geoStats.map(stat => ({
          country: stat.country_code,
          count: parseInt(stat.user_count)
        }))
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching online users:', error);
    return Response.json(
      { error: 'Failed to fetch online users' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, publicKey, action = 'join', countryCode } = body;

    if (!userId || !publicKey) {
      return Response.json(
        { error: 'userId and publicKey are required' },
        { status: 400 }
      );
    }

    if (action === 'join') {
      // Create or update user in database
      const existingUser = await sql`
        SELECT user_id FROM anonymous_users WHERE user_id = ${userId}
      `;

      if (existingUser.length > 0) {
        await sql`
          UPDATE anonymous_users 
          SET status = 'online', last_seen = CURRENT_TIMESTAMP, public_key = ${publicKey}
          WHERE user_id = ${userId}
        `;
      } else {
        await sql`
          INSERT INTO anonymous_users (user_id, public_key, status, country_code)
          VALUES (${userId}, ${publicKey}, 'online', ${countryCode || null})
        `;
      }

      // Start user session
      const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      const ipHash = btoa(clientIP).substring(0, 32);
      const userAgentHash = btoa(userAgent).substring(0, 32);
      const sessionToken = btoa(userId + Date.now() + Math.random()).substring(0, 64);

      await sql`
        INSERT INTO user_sessions (user_id, session_token, ip_hash, user_agent_hash)
        VALUES (${userId}, ${sessionToken}, ${ipHash}, ${userAgentHash})
      `;

      return Response.json({
        success: true,
        action: 'joined',
        userId,
        sessionToken
      });

    } else if (action === 'leave') {
      // End user sessions and mark offline
      await sql`DELETE FROM user_sessions WHERE user_id = ${userId}`;
      
      await sql`
        UPDATE anonymous_users 
        SET status = 'offline'
        WHERE user_id = ${userId}
      `;

      return Response.json({
        success: true,
        action: 'left',
        userId
      });
    }

    return Response.json(
      { error: 'Invalid action. Use: join or leave' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error updating user status:', error);
    return Response.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}