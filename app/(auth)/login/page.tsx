// /app/(auth)/login/page.tsx

import { LoginForm } from "@/features/auth/ui/LoginForm";

export default function LoginPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <LoginForm />
        </div>
    );
}