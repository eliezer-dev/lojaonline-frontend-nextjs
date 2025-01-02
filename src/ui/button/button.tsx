import { IconType } from 'react-icons';
import {ButtonContainer} from './styles';
import Image from "next/image";

interface ButtonTextProps {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: IconType;
}


export  default function Button (props: ButtonTextProps) {
    const { icon: Icon, title, onClick, disabled } = props;
    return(
        <ButtonContainer onClick={props.onClick} disabled={props.disabled}>
            {Icon && <Icon />}
            {props.title}
          
        </ButtonContainer>
    )
}