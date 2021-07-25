import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import { ReactWrapper, mount, shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../helpers/testHelpers";
import { IQuestionContainerProps, IQuestionContainerState } from "../../Interfaces/QuestionContainer/IQuestionContainer";
import QuestionContainer from "../../Components/QuestionContainer";

const defaultProps: IQuestionContainerProps = {
    question: "An Animal cell contains?",
    multipleChoice: [
        { answer1: ["Cell wall", "Ribosomes"] },
        { answer2: ["Cytoplasm", "Chloroplast"] },
        { answer3: ["Partially permeable membrane", "Impermeable membrane"] },
        { answer4: ["Cellulose", "Mitochondria"] },
    ],
    correct: ["Ribosomes", "Cytoplasm", "Partially permeable membrane", "Mitochondria"],
    handleChangeReview: jest.fn(),
};

/**
 * @param {ShallowWrapper} - Enzyme Shallow Wrapper
 * @param {newprops}  IQuestionContainerProps - any props needed
 * @returns {ShallowWrapper} - Shallow Wrapper
 */

const setupShallow = (newprops?: IQuestionContainerProps) => {
    const props = { ...defaultProps, ...newprops };
    return shallow(<QuestionContainer {...props} />);
};

/**
 * @param {RenderResult} -  React Render Result
 * @param {newprops}  IQuestionContainerProps - any props needed
 * @returns {RenderResult} - React Render Result
 */

const setupRender = (newprops?: IQuestionContainerProps) => {
    const props = { ...defaultProps, ...newprops };
    return render(<QuestionContainer {...props} />);
};

describe("QuestionsContainer Component Renders", () => {
    let wrapper: ShallowWrapper | ReactWrapper;
    beforeEach(() => {
        wrapper = setupShallow();
    });

    test("Renders without an rerror", () => {
        const questionContainer = findByTestAttr(wrapper, "question-container-component");
        expect(questionContainer.length).toBe(1);
    });

    test("Renders with a header, 4 slide buttons and a result", () => {
        const questionContainer = findByTestAttr(wrapper, "question-container-component");
        expect(questionContainer.length).toBe(1);

        const questionContainerHeader = findByTestAttr(wrapper, "question-container-component-header");
        expect(questionContainerHeader.length).toBe(1);

        const questionContainerButtons = findByTestAttr(wrapper, "button-slide-component");
        expect(questionContainerButtons.length).toBe(4);

        const questionContainerResult = findByTestAttr(wrapper, "result-container");
        expect(questionContainerResult.length).toBe(1);
    });
});

describe("Functionalily of the component", () => {
    test("correct answer", () => {
        const wrapper = setupRender();
        // const questionContainerButtons = wrapper.findByTestId("button-slide-component");
        const correctAnserButton1 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[0]}`);
        fireEvent.click(correctAnserButton1);
        const correctAnserButton2 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[1]}`);
        fireEvent.click(correctAnserButton2);
        const correctAnserButton3 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[2]}`);
        fireEvent.click(correctAnserButton3);
        const correctAnserButton4 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[3]}`);
        fireEvent.click(correctAnserButton4);

        // expect(getResultState).toHaveBeenCalled();
        const questionContainerResult = wrapper.getByLabelText(`pass`);
        expect(questionContainerResult.textContent).toBe("The answer is correct!");
    });

    test("incorrect answer", () => {
        const wrapper = setupRender();
        // const questionContainerButtons = wrapper.findByTestId("button-slide-component");
        const anserButton1 = wrapper.getByLabelText(`button switch for Cell wall`);
        fireEvent.click(anserButton1);
        const anserButton2 = wrapper.getByLabelText(`button switch for Chloroplast`);
        fireEvent.click(anserButton2);
        const anserButton3 = wrapper.getByLabelText(`button switch for Impermeable membrane`);
        fireEvent.click(anserButton3);

        // expect(getResultState).toHaveBeenCalled();
        const questionContainerResult = wrapper.getByLabelText(`fail`);
        expect(questionContainerResult.textContent).toBe("The answer is incorrect X");
    });
});
