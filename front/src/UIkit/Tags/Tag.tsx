import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertCompilerOptionsFromJson } from 'typescript'

export interface ITag {
  title: string,
  count?: number,
  link?: string,
  hash?: string,
}

interface IProps {
  tag: ITag,
  type: string,
  onclick?: any,
  index: number,
  active?: number,
}

function Tag(props: IProps) {
  const navigate = useNavigate()
  const { tag, type, onclick, index, active } = props
  const [isChosen, setChooseTag] = useState(false)

  const handleChooseTag = () => {
    if (onclick) {
      if (tag.hash !== undefined) {
        if (tag.hash === '') {
          // console.log(1)
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else { onclick(tag.hash) }

      } else { onclick(index) }
    }
    if (tag.link && tag.link.length > 0) {
      navigate(tag.link)
    }
    onclick && onclick(index)
    if (type === 'default') {
      setChooseTag(!isChosen)
    }
    if (type === 'tinted') {
      navigate(`${tag.link}`)
    }
  }

  return (
    <div
      onClick={handleChooseTag}
      className={`tag tag_${type}${index === active || 0 && isChosen ? ` tag_active` : ''}`}
    >
      <div className="tag__title">{tag.title}</div>
      {tag.count ? <div className="tag__count">{tag.count}</div> : <></>}
    </div>
  )
}

export default Tag