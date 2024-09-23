import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <main className="auth-page">
            <div className="flex items-center justify-center h-full">
                <SignUp afterSignOutUrl="/" />
            </div>
        </main>
    );
};

export default SignUpPage;