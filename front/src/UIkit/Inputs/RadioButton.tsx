import React from 'react'
import { RadioButtonActiveIcon, RadioButtonIcon } from '../Icons';

interface IProps {
    isActive: boolean;
}

function RadioButton(props: IProps) {
    const { isActive } = props;
    return (
        <div className="radio-button">
            {
                isActive ? <RadioButtonActiveIcon /> : <RadioButtonIcon />
            }
        </div>
    )
}

export default RadioButton