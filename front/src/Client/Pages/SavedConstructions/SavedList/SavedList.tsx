import React from 'react'
import CatalogCard from '../../Catalog/Card/Card';

function SavedList(props: any) {
    const { data, onclick } = props;
    data && console.log(data)
    return (
        <div className="catalog__list">
            {
                data && data.map((card: any, index: number) => <CatalogCard key={index} card={{ ...card, id: card.solution_id }} />)
            }
        </div>
    )
}

export default SavedList