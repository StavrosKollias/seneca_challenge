import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../helpers/testHelpers";
import Container from "../../Components/Container/Container";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { IQuestionContainerProps } from "../../Interfaces/QuestionContainer/IQuestionContainer";

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
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @returns {ReactWrapper} - Shallow Wrapper
 */

const setup = () => {
    return shallow(<Container />);
};

/**
 * @param {RenderResult} -  React Render Result
 * @returns {RenderResult} - React Render Result
 */

const setupRender = () => {
    return render(<Container />);
};

describe("Container component renders", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test("component renders with no error", () => {
        const containerComponent = findByTestAttr(wrapper, "container-component");
        expect(containerComponent.length).toBe(1);
    });
});

describe("Container component renders", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = setupRender();
    });

    test("component changes state to animation and review", () => {
        const correctAnserButton1 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[0]}`);
        fireEvent.click(correctAnserButton1);
        const correctAnserButton2 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[1]}`);
        fireEvent.click(correctAnserButton2);
        const correctAnserButton3 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[2]}`);
        fireEvent.click(correctAnserButton3);
        const correctAnserButton4 = wrapper.getByLabelText(`button switch for ${defaultProps.correct[3]}`);
        fireEvent.click(correctAnserButton4);
        const containerComponent = wrapper.getByTestId("container-component");
        expect(containerComponent.className.includes("animate")).toBe(true);
    });
});
