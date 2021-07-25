import React from "react";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import { ReactWrapper, mount, shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../helpers/testHelpers";
import ButtonSlide from "../../Components/ButtonSlide";
import { IButtonSlideProps } from "../../Interfaces/ButtonSlide/IButtonSlide";

const handleChangeMock = jest.fn();

const defaultProps: IButtonSlideProps = {
    answers: ["Cell wall", "Ribosomes"],
    responsive: false,
    handleChangeSelect: handleChangeMock,
};

/**
 * @param {ShallowWrapper} - Enzyme Shallow Wrapper
 * @param {newprops}  IButtonSlideProps - any props needed
 * @returns {ShallowWrapper} - Shallow Wrapper
 */

const setupShallow = (newprops?: IButtonSlideProps) => {
    const props = { ...defaultProps, ...newprops };
    return shallow(<ButtonSlide {...props}></ButtonSlide>);
};

/**
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @param {newprops}  IButtonSlideProps - any props needed
 * @returns {ReactWrapper} - React Wrapper
 */

const setupMount = (newprops?: IButtonSlideProps) => {
    const props = { ...defaultProps, ...newprops };
    return mount(<ButtonSlide {...props} />);
};

/**
 * @param {RenderResult} -  React Render Result
 * @param {newprops}  IButtonSlideProps - any props needed
 * @returns {RenderResult} - React Render Result
 */

const setupRender = (newprops?: IButtonSlideProps) => {
    const props = { ...defaultProps, ...newprops };
    return render(<ButtonSlide {...props} />);
};

describe("ButtonSlide Component Renders", () => {
    let wrapper: ShallowWrapper | ReactWrapper;
    beforeEach(() => {
        wrapper = setupShallow();
    });

    test("Renders with no error", () => {
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
    });

    test("Renders  with 2 buttons and a slide", () => {
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1 = findByTestAttr(wrapper, "button-slide-component-button-0");
        expect(buttonChild1.length).toBe(1);
        const buttonChild2 = findByTestAttr(wrapper, "button-slide-component-button-1");
        expect(buttonChild2.length).toBe(1);
        const buttonSlide = findByTestAttr(wrapper, "button-slide");
        expect(buttonSlide.length).toBe(1);
    });

    test("Component renders as resposive for long text answers", () => {
        defaultProps.responsive = true;
        wrapper = setupShallow(defaultProps);
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        expect(buttonSlideComponent.hasClass("responsive")).toBe(true);
    });
});

describe("Events", () => {
    let wrapper: ReactWrapper | ShallowWrapper | RenderResult;
    test("2 buttons click handler triggers the handle mock click", () => {
        wrapper = setupMount();
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        const buttonChild1 = findByTestAttr(wrapper, "button-slide-component-button-0");
        expect(buttonChild1.length).toBe(1);
        buttonChild1.find("button").simulate("click");
        expect(handleChangeMock).toHaveBeenCalledTimes(2);
        const buttonChild2 = findByTestAttr(wrapper, "button-slide-component-button-1");
        expect(buttonChild2.length).toBe(1);
        buttonChild2.find("button").simulate("click");
        expect(handleChangeMock).toHaveBeenCalledTimes(3);
    });

    test("Button Click Changes the state/style of the Slider", () => {
        wrapper = setupRender(defaultProps);
        const button2 = wrapper.getByLabelText(`button switch for ${defaultProps.answers[1]}`);
        fireEvent.click(button2);
        const slide = wrapper.getByTestId("button-slide");
        expect(slide.style.marginLeft).toBe("50%");
        const button1 = wrapper.getByLabelText(`button switch for ${defaultProps.answers[0]}`);
        fireEvent.click(button1);
        expect(slide.style.marginLeft).toBe("0%");
    });
});

describe("ButtonSlide Component Renders with different props", () => {
    let wrapper: ShallowWrapper | ReactWrapper | RenderResult;
    beforeEach(() => {
        wrapper = setupShallow();
    });

    const newProps: IButtonSlideProps = {
        answers: ["Cell wall", "Ribosomes", "None"],
        responsive: true,
        handleChangeSelect: handleChangeMock,
    };

    test("Renders  with 3 buttons and a slide", () => {
        wrapper = setupShallow(newProps);
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1 = findByTestAttr(wrapper, "button-slide-component-button-0");
        expect(buttonChild1.length).toBe(1);
        const buttonChild2 = findByTestAttr(wrapper, "button-slide-component-button-1");
        expect(buttonChild2.length).toBe(1);
        const buttonChild3 = findByTestAttr(wrapper, "button-slide-component-button-2");
        expect(buttonChild3.length).toBe(1);
        const buttonSlide = findByTestAttr(wrapper, "button-slide");
        expect(buttonSlide.length).toBe(1);
    });

    test("Button Click Changes the state/style of the Slider with 3 buttons", () => {
        wrapper = setupRender(newProps);
        const button2 = wrapper.getByLabelText(`button switch for ${newProps.answers[1]}`);
        fireEvent.click(button2);
        const slide = wrapper.getByTestId("button-slide");
        expect(slide.style.marginLeft).toBe(100 / 3 + "%");
        const button1 = wrapper.getByLabelText(`button switch for ${newProps.answers[0]}`);
        fireEvent.click(button1);
        expect(slide.style.marginLeft).toBe("0%");
        const button3 = wrapper.getByLabelText(`button switch for ${newProps.answers[2]}`);
        fireEvent.click(button3);
        expect(slide.style.marginLeft).toBe(2 * (100 / 3) + "%");
    });

    test("Renders with 4 buttons and becomes responsive automatically due to answers>3 answers", () => {
        newProps.answers.push("another one");
        wrapper = setupShallow(newProps);
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1 = findByTestAttr(wrapper, "button-slide-component-button-0");
        expect(buttonChild1.length).toBe(1);
        const buttonChild2 = findByTestAttr(wrapper, "button-slide-component-button-1");
        expect(buttonChild2.length).toBe(1);
        const buttonChild3 = findByTestAttr(wrapper, "button-slide-component-button-2");
        expect(buttonChild3.length).toBe(1);
        const buttonChild4 = findByTestAttr(wrapper, "button-slide-component-button-3");
        expect(buttonChild4.length).toBe(1);
        const buttonSlide = findByTestAttr(wrapper, "button-slide");
        expect(buttonSlide.length).toBe(1);
    });

    test("Renders with 4 buttons and not responsive prop", () => {
        newProps.responsive = false;
        wrapper = setupMount(newProps);
        const buttonSlideComponent = findByTestAttr(wrapper, "button-slide-component");
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1 = findByTestAttr(wrapper, "button-slide-component-button-0");
        expect(buttonChild1.length).toBe(1);
        const buttonChild2 = findByTestAttr(wrapper, "button-slide-component-button-1");
        expect(buttonChild2.length).toBe(1);
        const buttonChild3 = findByTestAttr(wrapper, "button-slide-component-button-2");
        expect(buttonChild3.length).toBe(1);
        const buttonChild4 = findByTestAttr(wrapper, "button-slide-component-button-3");
        expect(buttonChild4.length).toBe(1);
    });
});
