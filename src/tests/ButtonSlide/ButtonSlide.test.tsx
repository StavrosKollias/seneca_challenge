
import React from 'react';
import { ReactWrapper,mount,shallow, ShallowWrapper } from 'enzyme';
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
 * @param {ShallowWrapper} - Enzyme Shallow Wrapper
 * @param {newprops}  IButtonProps - any props needed
 * @returns {ShallowWrapper} - Shallow Wrapper
 */

const setupShallow =(newprops?:IButtonSlideProps)=>{
    const props= {...derfaultProps, ...newprops}
    return shallow(<ButtonSlide {...props}></ButtonSlide>)
}


/**
 * @param {ReactWrapper} - Enzyme React Wrapper
 * @param {newprops}  IButtonProps - any props needed
 * @returns {ReactWrapper} - React Wrapper
 */

const setupMount =(newprops?:IButtonSlideProps)=>{
    const props= {...derfaultProps, ...newprops}
    return mount(<ButtonSlide {...props}/>);
}



describe('ButtonSlide Component Renders', ()=>{
    let wrapper: ShallowWrapper | ReactWrapper;
    beforeEach(()=>{
        wrapper= setupShallow();
    })

    test('Renders with no error',()=>{
        const buttonSlideComponent= findByTestAttr(wrapper, 'button-slide-component');
        expect(buttonSlideComponent.length).toBe(1);
    });


    test('Renders  with 2 buttons and a slide',()=>{
        const buttonSlideComponent= findByTestAttr(wrapper, 'button-slide-component');
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1= findByTestAttr(wrapper,'button-slide-component-button-0');
        expect(buttonChild1.length).toBe(1);
        const buttonChild2= findByTestAttr(wrapper,'button-slide-component-button-1');
        expect(buttonChild2.length).toBe(1);

        const buttonSlide= findByTestAttr(wrapper,'button-slide');
        expect(buttonSlide.length).toBe(1);
    });
});


describe('Events',()=>{
    let wrapper: ShallowWrapper | ReactWrapper;
    test('2 buttons click handler triggers the handle mock click',()=>{
        wrapper= setupMount();
        const buttonSlideComponent= findByTestAttr(wrapper, 'button-slide-component');
        expect(buttonSlideComponent.length).toBe(1);
        const buttonChild1= findByTestAttr(wrapper,'button-slide-component-button-0');
        expect(buttonChild1.length).toBe(1);
        buttonChild1.find('button').simulate('click');
        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        const buttonChild2= findByTestAttr(wrapper,'button-slide-component-button-1');
        expect(buttonChild2.length).toBe(1);
        buttonChild2.find('button').simulate('click');
        expect(handleChangeMock).toHaveBeenCalledTimes(2);
    });


    // test('Button Click Changes the state/style of the Slider',()=>{
    //     wrapper= setupMount();
    //     const buttonSlideComponent= findByTestAttr(wrapper, 'button-slide-component');
    //     expect(buttonSlideComponent.length).toBe(1);
    //     const buttonChild1= findByTestAttr(wrapper,'button-slide-component-button-0');
    //     expect(buttonChild1.length).toBe(1);
    //     buttonChild1.find('button').simulate('click');
    //     expect(handleChangeMock).toHaveBeenCalledTimes(1);

    //     const buttonSlide= findByTestAttr(wrapper,'button-slide');
    //     expect(buttonSlide.length).toBe(1);
    //     const buttonChild2= findByTestAttr(wrapper,'button-slide-component-button-1');
    //     expect(buttonChild2.length).toBe(1);
    //     buttonChild2.find('button').simulate('click');
    //     expect(handleChangeMock).toHaveBeenCalledTimes(2);
    // });
});