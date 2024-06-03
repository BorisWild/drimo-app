import React from 'react'
import { SavedIcon } from '../Icons'

interface IProps {
  isSaved: boolean,
  onclick?: () => void
}

function WishlistButton(props: IProps) {
  const { isSaved, onclick } = props;
  return (
    <div className={`button-wishlist ${isSaved ? 'button-wishlist_active' : ''}`} onClick={onclick}>
      <SavedIcon color="#ffffff" />
    </div>
  )
}

export default WishlistButton