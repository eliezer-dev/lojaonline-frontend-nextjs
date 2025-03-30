'use client';

import { ButtonTextContainer } from "./styles";


interface ButtonTextProps {
    title: string;
    onClick?: () => void;
}

export default function ButtonText (props: ButtonTextProps) {
    return (
        <ButtonTextContainer onClick={props.onClick}>
            {props.title}
        </ButtonTextContainer>
    )
}