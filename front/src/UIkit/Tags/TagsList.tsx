import React from 'react'
import Tag, { ITag } from './Tag'



interface IProps {
  tags: ITag[],
  onclick?: any,
  activeTag?: number,
  type: string,
}

function TagsList(props: IProps) {
  const { tags, type, onclick, activeTag } = props
  return (
    <div className="tags">
      {tags && tags.map((tag: ITag, index: number) => <Tag onclick={onclick} key={`${tag.title}_${index}`} active={activeTag} index={index} tag={tag} type={type} />)}
    </div>

  )
}

export default TagsList