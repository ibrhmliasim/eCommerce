// src/shared/lib/errorMessages.ts

// Single dictionary: error_code (from backend, see App\Exceptions\ApiException)
// -> localized text. The backend does not deliver the finished text to the user -
// only stable code, translation entirely at the front.

export type Locale = 'ja' | 'en' | 'ru';

type ErrorMessages = Record<string, Record<Locale, string>>;

export const errorMessages: ErrorMessages = {
    // --- Auth ---
    'auth.invalid_credentials': {
        ja: 'メールアドレスまたはパスワードが正しくありません。',
        en: 'Incorrect email or password.',
        ru: 'Неверный email или пароль.',
    },
    'auth.email_already_verified': {
        ja: 'このメールアドレスはすでに確認済みです。',
        en: 'This email address is already verified.',
        ru: 'Этот email уже подтверждён.',
    },
    'auth.invalid_verification_link': {
        ja: '認証リンクが無効か期限切れです。もう一度お試しください。',
        en: 'This verification link is invalid or has expired.',
        ru: 'Ссылка недействительна или истёк срок её действия.',
    },

    // --- Validation: codes according to the Request file in Laravel, not according to the Laravel text ---
    'validation.email.required': {
        ja: 'メールアドレスを入力してください。',
        en: 'Email is required.',
        ru: 'Введите email.',
    },
    'validation.email.email': {
        ja: '有効なメールアドレスを入力してください。',
        en: 'Please enter a valid email address.',
        ru: 'Введите корректный email.',
    },
    'validation.email.unique': {
        ja: 'このメールアドレスはすでに使用されています。',
        en: 'This email is already taken.',
        ru: 'Этот email уже занят.',
    },
    'validation.password.required': {
        ja: 'パスワードを入力してください。',
        en: 'Password is required.',
        ru: 'Введите пароль.',
    },
    'validation.password.min': {
        ja: 'パスワードは8文字以上で入力してください。',
        en: 'Password must be at least 8 characters.',
        ru: 'Пароль должен содержать минимум 8 символов.',
    },
    'validation.password.confirmed': {
        ja: 'パスワードが一致しません。',
        en: 'Passwords do not match.',
        ru: 'Пароли не совпадают.',
    },
    'validation.phone.unique': {
        ja: 'この電話番号はすでに使用されています。',
        en: 'This phone number is already taken.',
        ru: 'Этот номер телефона уже занят.',
    },

    // --- Generic fallbacks ---
    'validation.failed': {
        ja: '入力内容に誤りがあります。',
        en: 'Please check the highlighted fields.',
        ru: 'Проверьте заполненные поля.',
    },
    'server.internal_error': {
        ja: 'エラーが発生しました。しばらくしてから再度お試しください。',
        en: 'Something went wrong on our end. Please try again shortly.',
        ru: 'Что-то пошло не так на сервере. Попробуйте позже.',
    },
    'network.unreachable': {
        ja: '接続できません。インターネット接続をご確認ください。',
        en: "Can't reach the server. Please check your connection.",
        ru: 'Не удаётся связаться с сервером. Проверьте соединение.',
    },
    'unknown.error': {
        ja: '予期しないエラーが発生しました。',
        en: 'An unexpected error occurred.',
        ru: 'Произошла непредвиденная ошибка.',
    },
};

export function translateErrorCode(code: string, locale: Locale = 'ja'): string {
    return errorMessages[code]?.[locale] ?? errorMessages['unknown.error'][locale];
}