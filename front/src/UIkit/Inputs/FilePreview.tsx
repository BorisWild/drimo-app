import { link } from 'fs'
import React from 'react'
import { DeleteIcon, DocumentIcon } from '../Icons'

interface FileProps {
  title: string,
  size: number,
  link?: any,
  ondelete?: any,
}

function FilePreview({ title, size, link, ondelete }: FileProps) {
  function megabytes() {
    return (size / 1048576).toFixed(2)
  }

  const handleDownloadFile = (event: any) => {
    event.stopPropagation()
    if (link && link.length > 0) {
      window.open(link, '_blank')
    }
  }

  return (
    <div className="file-preview" >
      <div className="file-preview__body" >
        <DocumentIcon />
        <div className="file-preview__info" onClick={handleDownloadFile}>
          <div className="file-preview__title">{title.split('.')[0]}</div>
          {size ? <div className="file-preview__size">{megabytes()} Мб</div> : <></>}
        </div>

        <DeleteIcon onclick={ondelete} />
      </div>
    </div>
  )
}

export default FilePreview