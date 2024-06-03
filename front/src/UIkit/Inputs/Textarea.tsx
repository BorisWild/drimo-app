import React, { useEffect, useState } from 'react'
import { RequiredIcon } from '../Icons';
import { IInput } from './Input';

function Textarea(props: IInput) {
    const { isRequired, title, value, onchange } = props;
    const [isFocused, setFocused] = useState(false)
    const [textValue, setTextValue] = useState('')

    useEffect(() => { if (value) setTextValue(value) }, [value])

    return (
        <div className="input">
            <div className="input__label label">
                <p className="label__title">{title}</p>
                {
                    isRequired && <RequiredIcon />
                }
            </div>
            <div className={`input__container ${isFocused ? 'input__container_focused' : ''}`}>
                <textarea
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        setFocused(false);
                        onchange(e.target.value.trim())
                        onchange(e.target.value.replace(/\'/g, '"'))
                    }
                    }
                    rows={5}
                    maxLength={2000}
                    onChange={e => onchange(e.target.value)}
                    className="input__textarea"
                    required={isRequired}
                    value={value} />
            </div>
        </div>
    )
}

export default Textarea