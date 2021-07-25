import React from "react";

import "../../scss/Container.scss";
import QuestionContainer from "../QuestionContainer";
import Review from "../Review/Review";

import reviewImage from "../../review_answer.png";

const Container: React.FC = () => {
    const [state, setState] = React.useState<boolean>(false);

    return (
        <div data-testid="container-component" className={`container ${state ? "animate" : ""}`}>
            <QuestionContainer
                question="An Animal cell contains?"
                multipleChoice={[
                    { answer1: ["Cell wall", "Ribosomes"] },
                    { answer2: ["Cytoplasm", "Chloroplast"] },
                    { answer3: ["Partially permeable membrane", "Impermeable  membrane"] },
                    { answer4: ["Cellulose", "Mitochondria"] },
                ]}
                correct={["Ribosomes", "Cytoplasm", "Partially permeable membrane", "Mitochondria"]}
                handleChangeReview={(e) => setState(e)}
            />

            {state && <Review imgUrl={reviewImage} alt={"testing details of review"} />}
        </div>
    );
};

export default Container;
