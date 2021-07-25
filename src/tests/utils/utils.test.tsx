import { IQuestionContainerState } from "../../Interfaces/QuestionContainer/IQuestionContainer";
import { getResultState, validateAnswer } from "../../utils/utils";

const initialState: IQuestionContainerState = {
    question: "An Animal cell contains?",
    multipleChoice: [
        { answer1: ["Cell wall", "Ribosomes"] },
        { answer2: ["Cytoplasm", "Chloroplast"] },
        { answer3: ["Partially permeable membrane", "Impermeable membrane"] },
        { answer4: ["Cellulose", "Mitochondria"] },
    ],
    correct: ["Ribosomes", "Cytoplasm", "Partially permeable membrane", "Mitochondria"],
    userAnswers: ["Ribosomes", "Cytoplasm", "Impermeable membrane", "Mitochondria"],
    resultState: "",
};

test("getResultState function returns the class for the answers", () => {
    const class1 = getResultState(3, initialState);
    expect(class1).toBe("warning");

    const class2 = getResultState(1, initialState);
    expect(class2).toBe("fail");

    const class3 = getResultState(4, initialState);
    expect(class3).toBe("pass");

    const class4 = getResultState(0, initialState);
    expect(class4).toBe("fail");

    const class5 = getResultState(2, initialState);
    expect(class5).toBe("fail");

    const class6 = getResultState(4, initialState);
    expect(class6).toBe("pass");
});

test("validateAnswer returns the array length with correct answers", () => {
    const lengthCorrectAnswers = validateAnswer(initialState.userAnswers, initialState);
    expect(lengthCorrectAnswers).toBe(3);
});
