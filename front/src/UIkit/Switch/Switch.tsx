import React, { useState } from 'react'
import { RequiredIcon } from '../Icons'

interface IProps {
  title: string,
  statusOn: string,
  statusOff: string,
  status: boolean,
  isRequired: boolean,
  onchange: any,
}

function Switch(props: IProps) {
  const { title, statusOff, statusOn, isRequired, status, onchange } = props

  return (
    <div className="switch">
      <div className="switch__title label">{title}
        {
          isRequired && <RequiredIcon />
        }</div>
      <div className="switch__container">
        <div onClick={onchange} className={`switch__button ${status ? 'switch__button_on' : 'switch__button_off'}`}>
          <div className="switch__button-circle" />
        </div>
        <div className="switch__status">
          {
            status ? statusOn : statusOff
          }
        </div>
      </div>

    </div>
  )
}

export default Switch