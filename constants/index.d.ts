import { CardPrefixRuleType, CardType, ErrorMessageType } from '../types';
export declare const NUMBER_REGEX: RegExp;
export declare const ERROR_MESSAGE: Record<string, ErrorMessageType>;
export declare const MIN_MONTH = 1;
export declare const MAX_MONTH = 12;
export declare const CURRENT_YEAR: number;
export declare const MAX_LENGTH: {
    CARD_NUMBER: number;
    EXPIRATION_DATE: number;
    CVC_NUMBER: number;
    PASSWORD: number;
};
export declare const CARD_PREFIX_RULE: CardPrefixRuleType[];
export declare const cardParsingRule: (type: CardType) => number[];
export declare const DATE_PARSING_RULE: number[];
