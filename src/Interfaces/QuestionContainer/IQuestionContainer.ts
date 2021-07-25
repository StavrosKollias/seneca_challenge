export interface IQuestionContainerProps {
    question: string;
    multipleChoice: Array<IAnswers>;
    correct: Array<string>;
    handleChangeReview(review: boolean): void;
}
export interface IQuestionContainerState {
    question: string;
    multipleChoice: Array<IAnswers>;
    correct: Array<string>;
    userAnswers: Array<string>;
    resultState: string;
}

export interface IAnswers {
    [name: string]: Array<string>;
}
