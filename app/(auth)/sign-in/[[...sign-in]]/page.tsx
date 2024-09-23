import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return (
        <main className="auth-page">
          <div className="flex items-center justify-center h-full">
            <SignIn afterSignOutUrl="/" />
          </div>
        </main>
    );
};

export default SignInPage;