import React from "react";
import { IAnswers, IQuestionContainerProps, IQuestionContainerState } from "../../Interfaces/QuestionContainer/IQuestionContainer";
import { getResultState, validateAnswer } from "../../utils/utils";
import ButtonSlide from "../ButtonSlide";

const QuestionContainer: React.FC<IQuestionContainerProps> = ({ question, multipleChoice, correct, handleChangeReview }) => {
    const initialState: IQuestionContainerState = {
        question: question,
        multipleChoice: multipleChoice,
        correct: correct,
        userAnswers: [],
        resultState: "",
    };
    const [state, setState] = React.useState<IQuestionContainerState>(initialState);

    const setNewValueInState = (newValues: object) => {
        setState((state) => {
            return {
                ...state,
                ...newValues,
            };
        });
    };

    const handleChangeAnswer = (value: string, index: number) => {
        const resultsArray = state.userAnswers;
        resultsArray[index] = value;
        const correctAnswers = validateAnswer(resultsArray, state);
        const result = getResultState(correctAnswers, state);
        handleChangeReview(result === "pass");
        setNewValueInState({ userAnswers: resultsArray, resultState: result });
    };

    return (
        <div className={`question-container ${state.resultState}`} data-testid="question-container-component">
            <h1 data-testid="question-container-component-header">{state.question}</h1>
            {state.multipleChoice.map((answer: IAnswers, index: number) => {
                if (index === 2) {
                    return (
                        <ButtonSlide
                            data-testid="button-slide-component"
                            key={index}
                            responsive={true}
                            answers={answer[Object.keys(answer)[0]]}
                            handleChangeSelect={(e) => {
                                handleChangeAnswer(e, index);
                            }}
                            disabled={state.resultState === "pass"}
                        />
                    );
                }
                return (
                    <ButtonSlide
                        data-testid="button-slide-component"
                        key={index}
                        responsive={false}
                        answers={answer[Object.keys(answer)[0]]}
                        handleChangeSelect={(e) => {
                            handleChangeAnswer(e, index);
                        }}
                        disabled={state.resultState === "pass"}
                    />
                );
            })}
            {state.resultState === "pass" ? (
                <div className="result" aria-label={state.resultState} data-testid="result-container">
                    The answer is correct!
                </div>
            ) : (
                <div className="result" aria-label={state.resultState} data-testid="result-container">
                    The answer is incorrect X
                </div>
            )}
        </div>
    );
};

export default QuestionContainer;
