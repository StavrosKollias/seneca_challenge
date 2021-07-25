import { IQuestionContainerState } from "../Interfaces/QuestionContainer/IQuestionContainer";

export const getResultState = (correctAnswersLength: number, state: IQuestionContainerState) => {
    const percentage = (correctAnswersLength / state.correct.length) * 100;
    // if (percentage <= 50) {
    //     return "fail";
    // }

    // if (percentage < 100 && percentage > 50) {
    //     return "warning";
    // }

    // if (percentage === 100) {
    //     return "pass";
    // }

    let result = percentage <= 50 ? "fail" : percentage < 100 && percentage > 50 ? "warning" : "pass";
    // console.log(result);
    return result;
};

export const validateAnswer = (newResultsArray: Array<string>, state: IQuestionContainerState) => {
    return state.correct.filter((item, index) => {
        return item === newResultsArray[index];
    }).length;
};
