import sql from "../../utils/sql";

// Create or update an anonymous user
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, publicKey, countryCode } = body;

    if (!userId || !publicKey) {
      return Response.json(
        { error: 'userId and publicKey are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT user_id, status FROM anonymous_users 
      WHERE user_id = ${userId}
    `;

    if (existingUser.length > 0) {
      // Update existing user's status and last seen
      await sql`
        UPDATE anonymous_users 
        SET status = 'online', 
            last_seen = CURRENT_TIMESTAMP,
            public_key = ${publicKey}
        WHERE user_id = ${userId}
      `;
      
      return Response.json({
        success: true,
        userId,
        action: 'updated',
        status: 'online'
      });
    } else {
      // Create new user
      const result = await sql`
        INSERT INTO anonymous_users (user_id, public_key, status, country_code)
        VALUES (${userId}, ${publicKey}, 'online', ${countryCode || null})
        RETURNING user_id, status, created_at
      `;

      return Response.json({
        success: true,
        userId,
        action: 'created',
        status: 'online',
        createdAt: result[0].created_at
      });
    }

  } catch (error) {
    console.error('Error creating/updating user:', error);
    return Response.json(
      { error: 'Failed to create or update user' },
      { status: 500 }
    );
  }
}