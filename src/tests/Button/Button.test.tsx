import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../helpers/testHelpers";
import Button from "../../Components/Button";
import { IButtonProps } from "../../Interfaces/Button/IButton";

const handleClickMock = jest.fn();

const defaultProps: IButtonProps = {
    title: "I am a button title",
    className: "btn",
    children: "I am a text child",
    handleClick: handleClickMock,
};

/**
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @param {newprops}  IButtonProps - any props needed
 * @returns {ReactWrapper} - Shallow Wrapper
 */

const setup = (newprops: IButtonProps) => {
    const props = { ...defaultProps, ...newprops };
    return shallow(<Button {...props}></Button>);
};

describe("Button component", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup(defaultProps);
    });

    test("Renders one button without an error.", () => {
        const button = findByTestAttr(wrapper, "button-component");
        expect(button.length).toBe(1);
    });

    test("Renders with correct props", () => {
        const button = findByTestAttr(wrapper, "button-component");
        expect(button.hasClass(defaultProps.className)).toBe(true);
        expect(button.props().title).toEqual(defaultProps.title);
    });

    test("ClickEvent triggers mock function", () => {
        const button = findByTestAttr(wrapper, "button-component");
        button.simulate("click");
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
});
