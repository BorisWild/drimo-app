import React from 'react'
import { useNavigate } from 'react-router-dom';

interface IBreadcrumb {
  id: number,
  title: string,
  link?: string,
}

interface IProps {
  data: IBreadcrumb[]
}

function Breadcrumbs(props: IProps) {
  const { data } = props;
  const navigate = useNavigate()
  function handleNavigate(link: string) {
    navigate(`${link}`)

  }
  return (
    <div className="breadcrumbs">
      {
        data.map((el, index) => {
          if (index + 1 === data.length) {
            return (
              <div key={el.id} className="breadcrumbs__item">{` ${el.title}`}</div>
            )
          } else {
            return (
              <div onClick={() => {
                if (el.link) {
                  handleNavigate(el.link)
                }
              }} key={el.id} className={`breadcrumbs__item ${el.link ? 'breadcrumbs__item_active' : ''}`}>
                {`${el.title} /`}&nbsp;</div>
            )
          }
        }

        )
      }
    </div>
  )
}

export default Breadcrumbs