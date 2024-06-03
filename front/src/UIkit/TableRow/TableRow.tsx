import React from 'react'
import { Link } from 'react-router-dom';


interface ICol {
  width: number,
  data: any,
  title: string,
}

interface IProps {
  firstWidth: number,
  image?: string,
  title: string,
  id: number,
  created_at?: number | string,
  updated_at?: number | string,
  additional: ICol[],
  type: string,
  tier?: number,
}

function TableRow(props: IProps) {

  const {
    image,
    firstWidth,
    title,
    id,
    created_at,
    updated_at,
    additional,
    tier,
    type
  } = props;

  function getLink(tier: number | undefined) {
    if (tier === 1) {
      return '/admin/catalog/' + id
    } else if (tier === 2) {
      return '/admin/catalog/category/' + id
    } else if (tier === 3) {
      return '/admin/catalog/category/solution/' + id
    }
    else return ''

  }

  return (
    <Link to={getLink(tier)} className="table__row">
      {image && <div className="table__image ">
        <img src={image} alt="" />
      </div>}
      <div className={`table__col table__col_title-id table__col_w${firstWidth}`}>
        <div className="table__title">{title}</div>
        <div className="table__label">ID {id}</div>
      </div>
      {
        additional.map((col, index) =>
          <div key={index} className={`table__col table__col_w${col.width}`}>
            <div className="table__col-label table__label">
              {col.title}
            </div>
            <div className="table__col-data">
              {col.data}
            </div>

          </div>
        )
      }
      {
        created_at && <div className="table__col table__col_date table__col_w1">
          <div className="table__col-label table__label">
            Добавлено
          </div>
          <div className="table__col-data">
            <div className="">{created_at}</div>
            <div className="table__label">{created_at}</div>
          </div>

        </div>
      }
      {
        updated_at && <div className="table__col table__col_date table__col_w1">
          <div className="table__col-label table__label">
            Посл. изменение
          </div>
          <div className="table__col-data">
            <div className="">{updated_at}</div>
            <div className="table__label">{updated_at}</div>
          </div>

        </div>
      }
    </Link>
  )
}

export default TableRow