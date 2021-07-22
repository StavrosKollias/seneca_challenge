export interface IButtonSlideProps{
    className?: string;
    responsive: boolean;
    answers: Array<string>;
    handleChangeSelect(value:string):void;
}
