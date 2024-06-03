import React, { useState } from 'react'
import { RequiredIcon } from '../Icons';

export interface IInput {
    isRequired: boolean,
    title: string,
    isLittle: boolean,
    value?: any,
    onchange?: any,
    type?: string,
    onblur?: any,
    length?: number,
    valid?: boolean,
    disabled?: boolean,
}

function Input(props: IInput) {

    const { isRequired, title, isLittle, value, onchange, type, onblur, length, valid, disabled } = props;
    const [isFocused, setFocused] = useState(false)

    return (
        <div className="input">
            {
                !isLittle &&
                <div className="input__label label">
                    {title}
                    {
                        isRequired && <RequiredIcon />
                    }
                </div>
            }
            <div className={`input__container ${isFocused ? 'input__container_focused' : ''}`}>
                <input
                    min={0}
                    type={type || 'text'}
                    value={value}
                    onFocus={(e) => { setFocused(true) }}
                    onBlur={(e) => {
                        // e.target.value.trim().replace(/\'/g, '"')
                        onchange(e.target.value.trim().replace(/\'/g, '"'));
                        // console.log(e.target.value.trim())
                        onblur && onblur()
                        setFocused(false);
                    }}
                    onChange={(e) => onchange(e.target.value)}
                    className={`input__field${isLittle ? ' input__field_small' : ''}`}
                    required={isRequired}
                    placeholder={isLittle ? title : ''}
                    maxLength={length}
                    style={ disabled === true ? { 'pointerEvents' : 'none' } : {} }

                    
                />

            </div>
            {
                valid && <div className="input__validation">Поле обязательно</div>
            }
        </div>
    )
}

export default Input