// shared/ui/SuccessScreen/SuccessScreen.tsx

// 再利用された成功画面 - 登録、チェックアウト、
// および潜在的に他の最終フロー (パスワード リセットの成功など)
// 特定の機能のビジネス ロジックは含まれておらず、プレゼンテーション シェルのみが含まれています。

import Link from 'next/link';

export interface SuccessScreenAction {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
}

export interface SuccessScreenProps {
    title: string;
    description: string;
    actions: SuccessScreenAction[];
}

const actionStyles: Record<NonNullable<SuccessScreenAction['variant']>, string> = {
    primary: 'bg-primary text-primary-foreground py-2 px-4 cursor-pointer border border-neutral-300 text-black tracking-widest font-normal hover:border-black transition-all duration-300',
    secondary: 'bg-primary text-primary-foreground py-2 px-4 cursor-pointer border border-neutral-300 text-black tracking-widest font-normal hover:border-black transition-all duration-300',
}

export const SuccessScreen = ({ title, description, actions }: SuccessScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-16">
        <div className="space-y-2">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="text-3xl text-muted-foreground max-w-lg">{description}</p>
        </div>
        <div className="flex gap-3">
            {actions.map((action) => (
                <Link
                    key={action.href}
                    href={action.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    actionStyles[action.variant ?? 'primary']
                    }`}
                >
                    {action.label}
                </Link>
            ))}
        </div>
    </div>
  );
};