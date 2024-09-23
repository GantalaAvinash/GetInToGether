'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

const SignInPage = () => {

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignIn />
      <div className="text-sm mt-2 flex">
        <p>Forgot Password?</p>
        <Link href="/forget-password" className="text-blue-400 ml-2">
          Reset here
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
