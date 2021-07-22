import React from 'react';

import './scss/Container.scss';
import QuestionContainer from './Components/QuestionContainer';

const Container:React.FC=()=> {
  return (
    <div className="container">
        <QuestionContainer/>
    </div>
  );
}

export default Container;
