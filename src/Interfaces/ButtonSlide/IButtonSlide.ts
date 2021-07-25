export interface IButtonSlideProps {
    className?: string;
    responsive: boolean;
    answers: Array<string>;
    handleChangeSelect(value: string): void;
    disabled?: boolean;
}

export interface IButtonSlideState {
    answer: number;
    width: number;
    containerHeight: number;
}
