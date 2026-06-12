// /app/(auth)/login/page.tsx

import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-semibold text-center">
                    Login to your account
                </h1>

                <LoginForm />
            </div>
        </div>
    )
}
