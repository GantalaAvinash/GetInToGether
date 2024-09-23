'use client';

import { useUser, useAuth, SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    console.log('isSignedIn:', isSignedIn);
    console.log('user:', user);

    const saveUserData = async () => {
      if (isSignedIn && user) {
        const response = await fetch('/api/saveUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            emailAddress: user.primaryEmailAddress?.emailAddress || '',
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        });

        const data = await response.json();
        console.log('Save User Response:', data);
      }
    };

    saveUserData();
  }, [isSignedIn, user]);

  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default SignInPage;
