interface InputValueType<T> {
    initialState: T;
    maxLength: number;
    splitter?: string;
}
declare const useInputValue: <T extends string>(props: InputValueType<T>) => {
    state: T;
    onChange: (value: T) => void;
    isLengthComplete: boolean;
};
export default useInputValue;
