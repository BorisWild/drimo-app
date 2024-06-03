import React from 'react'
import { SpecificationMock } from '../../../Mocks/Specification'
import Element from './Element'

interface IProps {
    data: any,
    isActive: boolean,
}

function Specification(props: IProps) {
    const { isActive, data } = props;
    return (
        <div className={`order-specification__body ${isActive ? 'order-specification__body_active' : ''}`}>
            {
                data.map((el: any) => <Element element={el} />)
            }
        </div>
    )
}

export default Specification