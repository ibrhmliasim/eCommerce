// shared/ui/SuccessScreen/SuccessScreen.tsx

// 再利用された成功画面 - 登録、チェックアウト、
// および潜在的に他の最終フロー (パスワード リセットの成功など)
// 特定の機能のビジネス ロジックは含まれておらず、プレゼンテーション シェルのみが含まれています。

import Image from "next/image";
import Link from "next/link";

export interface SuccessScreenAction {
    label: string;
    variant?: 'primary' | 'secondary';
    href?: string;       // href か onClick のどちらか一方を渡す。両方省略はUI的に無意味なので型で防ぐ。
    onClick?: () => void;
}

export interface SuccessScreenProps {
    title: string;
    description: string;
    actions: SuccessScreenAction[];
}

const actionStyles: Record<NonNullable<SuccessScreenAction['variant']>, string> = {
    primary: 'bg-black text-white border border-black hover:bg-neutral-800 transition-colors duration-200',
    secondary: 'bg-transparent text-black border border-neutral-300 hover:border-black transition-colors duration-200',
};

const baseActionClass = 'px-4 py-2 rounded-md text-sm font-medium tracking-wide cursor-pointer';

export const SuccessScreen = ({ title, description, actions }: SuccessScreenProps) => {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-6 py-16 px-4">
            {/* 1. LOGO */}
            <header className="w-full">
                <Link href="/" className="inline-block text-black">
                    <Image
                        src="/logo/logo1.svg"
                        alt="PLUSH"
                        width={210}
                        height={55}
                        priority
                    />
                </Link>
            </header>
            <div className="space-y-3 max-w-md">
                <h1 className="text-2xl sm:text-3xl font-semibold">{title}</h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                {actions.map((action) => {
                    const className = `${baseActionClass} ${actionStyles[action.variant ?? 'primary']}`;

                    // href — навигация (register/checkout success).
                    // onClick — действие без перехода (напр. "отправить письмо повторно").
                    if (action.href) {
                        return (
                            <Link key={action.label} href={action.href} className={className}>
                                {action.label}
                            </Link>
                        );
                    }

                    return (
                        <button key={action.label} onClick={action.onClick} className={className}>
                            {action.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};