import React from 'react';
import ButtonSlide from '../ButtonSlide';

const QuestionContainer:React.FC=()=>{

    return(
        <div className="question-container">
            <h1>An Animal cell contains?</h1>
            <ButtonSlide  responsive={false} answers={['Cell wall',"Ribosomes"]} handleChangeSelect={(e)=>{ console.log(e)}}/>
            <ButtonSlide responsive={false}  answers={['Cytoplasm',"Chloroplast"]} handleChangeSelect={(e)=>{ console.log(e)}}/>
            <ButtonSlide responsive={true} answers={['Partially permeable membrane',"Impermeable  membrane"]} handleChangeSelect={(e)=>{ console.log(e)}}/>
            <ButtonSlide responsive={false}  answers={['Cellulose',"Mitochondria"]} handleChangeSelect={(e)=>{ console.log(e)}}/>
            <div className="result">The answer is incorrect </div>
        </div>
    )
}

export default QuestionContainer;
