'use client';


import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container">
    <h1 className="text-3xl text-center font-bold mb-2">
      Get In Together
    </h1>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}