import React from 'react';
import { IButtonSlideProps } from '../../Interfaces/ButtonSlide/IButtonSlide';
import Button from '../Button';


const ButtonSlide:React.FC<IButtonSlideProps>=({responsive,answers,handleChangeSelect})=>{
    const [state,setState]= React.useState<number>(0);
    const [widthState,setWidthState]= React.useState<number>(0);

    const [containerHeight, setContainerHeight] = React.useState(0)
    const ref = React.useRef<any>(null);

    const handleChangeState=(index:number,answer:string)=>{
        handleChangeSelect(answer);
        setState(index);
    }

    
const resizeWindow=(width:number, height:number)=>{
    setWidthState(width);
    setContainerHeight(height);
}
   
    React.useEffect(()=>{
       if(responsive || answers.length>3){
            console.log("I will be the responsive");
            setWidthState(window.innerWidth);
            setContainerHeight(ref.current.offsetHeight);
            window.addEventListener('resize',(e:any)=>{
                resizeWindow(window.innerWidth, ref.current.offsetHeight)
            });
       }
    
        return () => {
            window.removeEventListener('resize', ()=>resizeWindow(window.innerWidth, ref.current.offsetHeight));
          };
    },[]);
   
    const height={height: `${(containerHeight/answers.length)}px`,marginTop:`${(state * (containerHeight/answers.length))}px`};
    const width= {width: `${100/answers.length}%`,marginLeft:`${state* 100/answers.length}%`}
  

    return (<div data-test='button-slide-component' className={`button-slide-container ${responsive ?`responsive `:``} ${answers.length>3?'responsive active':''}`} ref={ref}>
            {answers.map((answer,index)=>{
                return <Button data-test={`button-slide-component-button-${index}`} title={`button switch for ${answer}`} key={index} className={`switch-button`} handleClick={()=> handleChangeState(index,answer)}> 
                         {index===0 && !responsive && <div className={answers.length>3?'slide-mobile': 'slide'} data-test='button-slide' style={answers.length>3?height:width}></div>}
                         {index===0 && responsive && <div className={widthState<1024 || answers.length>3?'slide-mobile': 'slide'} data-test='button-slide' style={widthState<1024|| answers.length>3?height:width}></div>}
                         <span className={state===index?"txt-caution":""}>{answer}</span> 
                         </Button>
            })}
        </div>
    )
}

export default ButtonSlide;