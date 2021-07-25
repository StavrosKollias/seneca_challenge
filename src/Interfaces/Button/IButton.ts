export interface IButtonProps {
    className: string;
    title: string;
    children: any;
    handleClick(): void;
    disabled?: boolean;
}
