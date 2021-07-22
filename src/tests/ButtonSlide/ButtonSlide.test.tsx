import React from 'react';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../utils/testHelpers';
import ButtonSlide from '../../Components/ButtonSlide';
import { IButtonSlideProps } from '../../Interfaces/ButtonSlide/IButtonSlide';
const handleChangeMock= jest.fn();

const derfaultProps: IButtonSlideProps={
    answers:['Cell wall',"Ribosomes"],
    responsive:false,
    handleChangeSelect:handleChangeMock
}

/**
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @param {newprops}  IButtonProps - any props needed
 * @returns {ReactWrapper} - Shallow Wrapper
 */

const setupShallow =(newprops?:IButtonSlideProps)=>{
    const props= {...derfaultProps, ...newprops}
    return shallow(<ButtonSlide {...props}></ButtonSlide>)
}


describe('ButtonSlide Component Renders', ()=>{
    let wrapper: ShallowWrapper;
    beforeEach(()=>{
        wrapper= setupShallow();
    })

    test('Renders with no error',()=>{
        const buttonSlideComponent= findByTestAttr(wrapper, 'button-slide-component');
        expect(buttonSlideComponent.length).toBe(1);
    });
})