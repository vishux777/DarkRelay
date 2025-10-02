import sql from "../../utils/sql";

// Get list of all users worldwide (anonymous)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'online';
    const limit = parseInt(searchParams.get('limit')) || 100;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Clean up old sessions first
    await sql`SELECT cleanup_old_sessions()`;

    // Get users with optional filtering
    let users;
    if (status === 'all') {
      users = await sql`
        SELECT 
          user_id,
          public_key,
          status,
          last_seen,
          created_at,
          country_code,
          connection_info
        FROM anonymous_users 
        ORDER BY last_seen DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      users = await sql`
        SELECT 
          user_id,
          public_key,
          status,
          last_seen,
          created_at,
          country_code,
          connection_info
        FROM anonymous_users 
        WHERE status = ${status}
        ORDER BY last_seen DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    // Get total count
    const countResult = status === 'all' 
      ? await sql`SELECT COUNT(*) as total FROM anonymous_users`
      : await sql`SELECT COUNT(*) as total FROM anonymous_users WHERE status = ${status}`;
    
    const totalUsers = parseInt(countResult[0].total);

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
        connectionInfo: user.connection_info
      })),
      pagination: {
        total: totalUsers,
        limit,
        offset,
        hasMore: (offset + limit) < totalUsers
      },
      stats: {
        onlineCount: users.filter(u => u.status === 'online').length,
        totalUsers,
        geoDistribution: geoStats.map(stat => ({
          country: stat.country_code,
          count: parseInt(stat.user_count)
        }))
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}