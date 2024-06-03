import React, { useState } from 'react'

interface IProps {
    total: number,
    onclick: any,
    current: number,
}

function Pagination(props: IProps) {
    const { total, onclick, current } = props;
    const pagesArray = new Array(total).fill(0)

    return (
        <div className="pagination">
            <div className="pagination__buttons">
                {
                    pagesArray.map((el, index) =>
                        <div
                            key={index}
                            className={`pagination__page${index === current ? ' pagination__page_active' : ''}`}
                            onClick={() => onclick(index)}
                        >
                            {index + 1}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Pagination