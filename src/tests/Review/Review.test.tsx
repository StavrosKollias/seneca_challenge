import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../helpers/testHelpers";
import { IReviewProps } from "../../Interfaces/Review/IReview";
import Review from "../../Components/Review/Review";

const defaultProps: IReviewProps = {
    imgUrl: "img",
    alt: "I am an image",
};

/**
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @param {newprops}  IReviewProps - any props needed
 * @returns {ReactWrapper} - Shallow Wrapper
 */

const setup = (newprops?: IReviewProps) => {
    const props = { ...defaultProps, ...newprops };
    return shallow(<Review {...props} />);
};

describe("Review component renders", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test("renders without an error", () => {
        const reviewComponent = findByTestAttr(wrapper, "review-component");
        expect(reviewComponent.length).toBe(1);
    });

    test("renders with correct props", () => {
        const reviewComponent = findByTestAttr(wrapper, "review-component");
        expect(reviewComponent.length).toBe(1);
        expect(reviewComponent.children.length).toBe(1);
        expect(reviewComponent.find("img").props().src).toEqual(defaultProps.imgUrl);
        expect(reviewComponent.find("img").props().alt).toEqual(defaultProps.alt);
    });
});
