import React from 'react'
import TableSort from '../TableFilter/TableSort'
import TableItem from './TableItem/TableItem';


export interface DataProps {
  title: string,
  id: number,
  payload?: any[],
  image?: string,
  created?: string,
  updated?: string,
}

interface IProps {
  data: DataProps[];
  sort: any[];
}



function Table(props: IProps) {
  const { data, sort } = props;
  return (
    <div className="table">
      {/* <TableSort sort={sort} /> */}
      <div className="table__body">
        {
          data.map(row => <TableItem {...row} />)
        }
      </div>
    </div>
  )
}

export default Table