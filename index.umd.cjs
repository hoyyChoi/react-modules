(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react")) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.index = {}, global.React));
})(this, function(exports2, react) {
  "use strict";
  const NUMBER_REGEX = /^[0-9]*$/;
  const ERROR_MESSAGE = {
    NUMBER_ONLY: "숫자만 입력 가능합니다.",
    MONTH_VALID: "유효하지 않은 월입니다.",
    YEAR_VALID: "유효하지 않은 연도입니다."
  };
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear() % 100;
  const MAX_LENGTH = {
    CARD_NUMBER: 16,
    EXPIRATION_DATE: 4,
    CVC_NUMBER: 3,
    PASSWORD: 2
  };
  const CARD_PREFIX_RULE = [
    // AMEX: 34, 37
    { type: "amex", length: 2, start: 34, end: 34 },
    { type: "amex", length: 2, start: 37, end: 37 },
    // Diners: 36
    { type: "diners", length: 2, start: 36, end: 36 },
    // UnionPay
    { type: "unionpay", length: 6, start: 622126, end: 622925 },
    { type: "unionpay", length: 3, start: 624, end: 626 },
    { type: "unionpay", length: 4, start: 6282, end: 6288 },
    // Visa: 4
    { type: "visa", length: 1, start: 4, end: 4 },
    // MasterCard: 51–55
    { type: "master", length: 2, start: 51, end: 55 }
  ];
  const DEFAULT_CARD_PARSING_RULE = [4, 4, 4, 4];
  const UNIQUE_CARD_PARSING_RULE = {
    diners: [4, 6, 4],
    amex: [4, 6, 5]
  };
  const cardParsingRule = (type) => {
    return UNIQUE_CARD_PARSING_RULE[type] ?? DEFAULT_CARD_PARSING_RULE;
  };
  const DATE_PARSING_RULE = [2, 2];
  const validateNumericString = (value) => {
    const error = !NUMBER_REGEX.test(value);
    if (error) return { error, errorMessage: ERROR_MESSAGE.NUMBER_ONLY };
    return { error, errorMessage: "" };
  };
  const validateExpirationDate = (value) => {
    const isNumberError = validateNumericString(value);
    if (isNumberError.error) return isNumberError;
    const month = parseInt(value.slice(0, 2));
    const year = parseInt(value.slice(2, 4));
    if (month < MIN_MONTH || month > MAX_MONTH) {
      return { error: true, errorMessage: ERROR_MESSAGE.MONTH_VALID };
    }
    if (year < CURRENT_YEAR) {
      return { error: true, errorMessage: ERROR_MESSAGE.YEAR_VALID };
    }
    return { error: false, errorMessage: "" };
  };
  const useCheckLengthComplete = (state, maxLength) => {
    return react.useMemo(() => state.length === maxLength, [state]);
  };
  const useInputValue = (props) => {
    const { initialState, maxLength, splitter } = props;
    const [state, setState] = react.useState(initialState);
    const onChange = (value) => {
      const cleanValue = splitter ? value.replace(new RegExp(splitter, "g"), "") : value;
      if (cleanValue.length <= maxLength) setState(cleanValue);
    };
    const isLengthComplete = useCheckLengthComplete(state, maxLength);
    return {
      state,
      onChange,
      isLengthComplete
    };
  };
  const useCardType = (input) => {
    return react.useMemo(() => {
      return detectCardType(input);
    }, [input]);
  };
  const detectCardType = (input) => {
    for (const { type, length, start, end } of CARD_PREFIX_RULE) {
      const prefix = Number(input.slice(0, length));
      if (prefix >= start && prefix <= end) {
        return type;
      }
    }
    return "none";
  };
  const getParsingValue = (input, pattern, splitter) => {
    const result = [];
    let cursor = 0;
    for (let i = 0; i < pattern.length; i++) {
      const size = pattern[i];
      const chunk = input.slice(cursor, cursor + size);
      if (!chunk) break;
      result.push(chunk);
      cursor += size;
    }
    return result.join(splitter);
  };
  const useCardNumber = (splitter = " ") => {
    const { state, onChange, isLengthComplete } = useInputValue({
      initialState: "",
      maxLength: MAX_LENGTH.CARD_NUMBER,
      splitter
    });
    const { error, errorMessage } = validateNumericString(state);
    const isValid = isLengthComplete && !error;
    const cardType = useCardType(state.slice(0, 6));
    const pattern = cardParsingRule(cardType);
    const displayValue = getParsingValue(state, pattern, splitter);
    return {
      value: displayValue,
      onChange,
      error,
      errorMessage,
      isLengthComplete,
      isErrorComplete: !error,
      isValid,
      cardType
    };
  };
  const useExpirationDate = (splitter = " ") => {
    const { state, onChange, isLengthComplete } = useInputValue({
      initialState: "",
      maxLength: MAX_LENGTH.EXPIRATION_DATE,
      splitter
    });
    const { error, errorMessage } = validateExpirationDate(state);
    const isValid = isLengthComplete && !error;
    const displayValue = getParsingValue(state, DATE_PARSING_RULE, splitter);
    return {
      value: displayValue,
      onChange,
      error,
      errorMessage,
      isLengthComplete,
      isErrorComplete: !error,
      isValid
    };
  };
  const useCvcNumber = () => {
    const { state, onChange, isLengthComplete } = useInputValue({
      initialState: "",
      maxLength: MAX_LENGTH.CVC_NUMBER
    });
    const { error, errorMessage } = validateNumericString(state);
    const isValid = isLengthComplete && !error;
    return {
      value: state,
      onChange,
      error,
      errorMessage,
      isLengthComplete,
      isErrorComplete: !error,
      isValid
    };
  };
  const usePassword = () => {
    const { state, onChange, isLengthComplete } = useInputValue({
      initialState: "",
      maxLength: MAX_LENGTH.PASSWORD
    });
    const { error, errorMessage } = validateNumericString(state);
    const isValid = isLengthComplete && !error;
    return {
      value: state,
      onChange,
      error,
      errorMessage,
      isLengthComplete,
      isErrorComplete: !error,
      isValid
    };
  };
  exports2.useCardNumber = useCardNumber;
  exports2.useCvcNumber = useCvcNumber;
  exports2.useExpirationDate = useExpirationDate;
  exports2.useInputValue = useInputValue;
  exports2.usePassword = usePassword;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
