export type ErrorMessageType = "" | "숫자만 입력 가능합니다." | "유효하지 않은 월입니다." | "유효하지 않은 연도입니다.";
export interface ValidateFuncReturnType {
    error: boolean;
    errorMessage: ErrorMessageType;
}
export interface HookReturnType {
    value: string;
    onChange: (value: string) => void;
    error: boolean;
    errorMessage: ErrorMessageType;
    isLengthComplete: boolean;
    isErrorComplete: boolean;
    isValid: boolean;
    cardType?: string;
}
export type CardNumberType = string;
export type ExpirationDateType = string;
export type CvcNumberType = string;
export type PasswordType = string;
export type cardStateType = CardNumberType | ExpirationDateType | CvcNumberType | PasswordType;
export type CardType = "visa" | "master" | "amex" | "diners" | "unionpay" | "none";
export interface CardPrefixRuleType {
    type: CardType;
    length: number;
    start: number;
    end: number;
}
