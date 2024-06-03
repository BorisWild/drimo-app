import { title } from 'process'
import React, { useEffect, useState } from 'react'

import { getDate, getTime } from '../../../../Helpers/getDate'
import { getImageFromJSON } from '../../../../Helpers/getImageFromJSON'
import { ISort } from '../../../../models/ISort'
import { ITextureElement } from '../../../../models/ITextureElement'
import { drimoAPI } from '../../../../services/DrimoService'
import { useAppDispatch } from '../../../../store/hooks/redux'
import { notificationsSlice } from '../../../../store/reducers/NotificationsSlice'

import File from '../../../../UIkit/Inputs/File'
import FilePreview from '../../../../UIkit/Inputs/FilePreview'
import Input from '../../../../UIkit/Inputs/Input'

interface TextureElementProps {
  element: ITextureElement,
  sorts: ISort[]
}

function TextureElementItem({ element: { id, title, cost, created_at, updated_at, weight, scan }, sorts }: TextureElementProps) {
  const [itemCost, setItemCost] = useState(String(Number(cost)))
  const [file, setFile] = useState(scan)
  const [updateElement, { error, data }] = drimoAPI.useUpdateTextureElementMutation()
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  let formData = new FormData()

  const handleChangeCost = (value: string) => {
    let _val = value.replace(/[^\d]/g, '')
    setItemCost(_val)
  }

  const handleUpdateElement = async () => {
    formData.set('cost', String(itemCost) + '.00')
    file && formData.set('file', file)

    await updateElement({ id, formData })
    dispatch(notificate({ title: 'Сохранено', isShown: true }))
  }

  const handleInputFile = (input: any) => {
    setFile(input.files[0])
    handleUpdateElement()
    // console.log(input.files[0])
  }


  return (
    <div className='table__item'>
      <div className="table__payload">
        <div className="table__payload-item payload-item">
          <div className="payload-item__container">
            <div className="payload-item__title">{title}</div>
            <div className="payload-item__subtitle">ID {id}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[1].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">{weight}</div>
          </div>

        </div>
        <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[2].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">
              <Input isRequired={false} title={''} isLittle={true} value={itemCost} type={'text'} onchange={handleChangeCost} onblur={handleUpdateElement} length={9} />
            </div>
          </div>

        </div>
        {/* <div className="table__payload-item payload-item">
          <div className="payload-item__sort">
            {sorts[3].params[0].param}
          </div>
          <div className="payload-item__container">
            <div className="payload-item__title">
              {
                file ? <FilePreview ondelete={() => { setFile('') }} title={'Scan file'} size={0} link={file ? getImageFromJSON(file) : ''} /> : <File name={''} title={'Добавить развертку'} isSmall={false} isRequired={false} types={[]} onchange={handleInputFile} />
              }

            </div>
          </div>

        </div> */}
        {
          created_at &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__sort">
              {sorts[3].params[0].param}
            </div>
            <div className="payload-item__container">
              <div className="payload-item__title">{getDate(updated_at)}</div>
              <div className="payload-item__subtitle">{getTime(updated_at)}</div>
            </div>

          </div>
        }
        {
          updated_at &&
          <div className="payload-item payload-item_date-column">
            <div className="payload-item__sort">
              {sorts[4].params[0].param}
            </div>
            <div className="payload-item__container">
              <div className="payload-item__title">{getDate(created_at)}</div>
              <div className="payload-item__subtitle">{getTime(created_at)}</div>
            </div>

          </div>
        }
      </div>
    </div>
  )
}

export default TextureElementItem