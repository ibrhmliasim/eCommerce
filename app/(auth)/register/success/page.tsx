// app/(auth)/register/success/page.tsx

import { SuccessScreen } from '@/shared/ui/SuccessScreen';

export default function RegisterSuccessPage() {
    return (
        <SuccessScreen
            title="いらっしゃいませ！"
            description="アカウントが作成されました。注文するにはメールを確認してください - すでにメールでリンクを送信しています。配送先住所は、後でアカウント設定で追加できます。"
            actions={[
                { label: 'ホームページへ', href: '/', variant: 'primary', },
                { label: 'アカウント設定へ', href: '/profile', variant: 'secondary' },
            ]}
        />
    );
}