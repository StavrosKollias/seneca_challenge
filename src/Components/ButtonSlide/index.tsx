import React from "react";
import { IButtonSlideProps, IButtonSlideState } from "../../Interfaces/ButtonSlide/IButtonSlide";
import Button from "../Button";

const ButtonSlide: React.FC<IButtonSlideProps> = ({ responsive, answers, handleChangeSelect, disabled }) => {
    const initialState: IButtonSlideState = {
        answer: Math.floor(Math.random() * answers.length),
        width: 0,
        containerHeight: 0,
    };
    const [state, setState] = React.useState<IButtonSlideState>(initialState);

    const ref = React.useRef<HTMLDivElement | null>(null);

    const handleChangeState = (index: number, answer: string) => {
        handleChangeSelect(answer);
        setNewValueInState({ answer: index });
    };

    const setNewValueInState = (newValues: object) => {
        setState((state) => {
            return {
                ...state,
                ...newValues,
            };
        });
    };

    const resizeWindow = React.useCallback(
        (width: number) => {
            setNewValueInState({ width: width, containerHeight: ref.current?.offsetHeight });
        },
        [state.containerHeight]
    );

    React.useEffect(() => {
        handleChangeSelect(answers[state.answer]);
        if (responsive || answers.length > 3) {
            resizeWindow(window.innerWidth);

            window.addEventListener("resize", () => {
                resizeWindow(window.innerWidth);
            });
        }

        return () => {
            window.removeEventListener("resize", () => resizeWindow(window.innerWidth));
        };
    }, []);

    const height = {
        height: `${(state.containerHeight + answers.length) / answers.length}px`,
        marginTop: `${state.answer * ((state.containerHeight + answers.length) / answers.length)}px`,
    };
    const width = { width: `${100 / answers.length}%`, marginLeft: `${(state.answer * 100) / answers.length}%` };

    return (
        <div
            data-testid="button-slide-component"
            className={`button-slide-container ${responsive ? `responsive ` : ``} ${answers.length > 3 ? "responsive active" : ""}`}
            ref={ref}>
            {answers.map((answer, index) => {
                return (
                    <Button
                        data-testid={`button-slide-component-button-${index}`}
                        title={`button switch for ${answer}`}
                        disabled={disabled}
                        key={index}
                        className={`switch-button  ${index === 0 ? "b-radius-top-left b-radius-bottom-left" : ""} ${
                            index === answers.length - 1 ? "b-radius-top-right  b-radius-bottom-right" : ""
                        }`}
                        handleClick={() => handleChangeState(index, answer)}>
                        {index === 0 && !responsive && (
                            <div className={answers.length > 3 ? "slide-mobile" : "slide"} data-testid="button-slide" style={answers.length > 3 ? height : width}></div>
                        )}
                        {index === 0 && responsive && (
                            <div
                                className={state.width < 1024 || answers.length > 3 ? "slide-mobile" : "slide"}
                                data-testid="button-slide"
                                style={state.width < 1024 || answers.length > 3 ? height : width}></div>
                        )}
                        <span className={state.answer === index ? "txt-highlighted" : ""}>{answer}</span>
                    </Button>
                );
            })}
        </div>
    );
};

export default ButtonSlide;
