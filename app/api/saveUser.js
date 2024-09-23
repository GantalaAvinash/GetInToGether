import { withAuth } from '@clerk/nextjs/api';
import dbConnect from '../../lib/db';
import User from '../../models/User';

const handler = withAuth(async (req, res) => {
  console.log('API called');
  await dbConnect();  // Ensure the database is connected

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, emailAddress, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ clerkId: userId });
    console.log('User:', user);

    if (!user) {
      // Create a new user if they don't exist
      user = new User({
        clerkId: userId,
        firstName,
        lastName,
        email: emailAddress,
      });
      await user.save();
    }

    res.status(200).json({ message: 'User saved successfully', user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default handler;
