import React from 'react'
import CatalogCard from '../Card/Card';

function CardsList(props: any) {
    const { data } = props;
    return (
        <div className="catalog__list">
            {
                data.map((card: any, index: number) => <CatalogCard key={index} card={card} />)
            }
        </div>
    )
}

export default CardsList