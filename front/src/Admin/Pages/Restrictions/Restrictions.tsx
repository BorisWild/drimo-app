import React, { useEffect, useState } from 'react'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import Input from '../../../UIkit/Inputs/Input'
import Switch from '../../../UIkit/Switch/Switch'

function Restrictions() {
  const [updateRestrictions] = drimoAPI.useUpdateRestrictionsMutation()
  const { data: restrictions, error, refetch } = drimoAPI.useFetchRestrictionsQuery('')

  const [maxLength, setMaxLength] = useState('0')
  const [maxWidth, setMaxWidth] = useState('0')
  const [maxHeight, setMaxHeight] = useState('0')
  const [minLength, setMinLength] = useState('0')
  const [minWidth, setMinWidth] = useState('0')
  const [minHeight, setMinHeight] = useState('0')
  const [ribsStatus, setRibsStatus] = useState(false)
  const [vhRation, setVhRation] = useState('0')
  const [facadeRatio, setFacadeRatio] = useState('0')
  const [isLoaded, setLoaded] = useState(false)
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))
  restrictions && console.log(restrictions)

  const handleUpdateRestrictions = () => {

    if (

      Number(maxWidth) >= 165 &&
      Number(maxHeight) >= 165 &&

      Number(maxWidth) <= 4080 &&
      Number(maxHeight) <= 2340 &&

      Number(minWidth) >= 165 &&
      Number(minHeight) >= 165 && 

      Number(minWidth) <= 600 &&
      Number(minHeight) <= 600 && 

      Number(maxWidth) > Number(minWidth) && 
      Number(maxHeight) > Number(minHeight) &&

      Number(vhRation) <= 100 &&
      Number(facadeRatio) <= 100

    ){

      updateRestrictions(
        {
          max_length: Number(maxLength),
          max_width: Number(maxWidth),
          max_height: Number(maxHeight),
          min_length: Number(minLength),
          min_width: Number(minWidth),
          min_height: Number(minHeight),
          ribs_status: ribsStatus,
          vh_ration: Number(vhRation),
          facade_ratio: Number(facadeRatio),
        }
      )
      dispatch(notificate({ title: 'Сохранено', isShown: true }))
      refetch()

    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
    }

  }

  useEffect(() => {
    if (restrictions) {
      setLoaded(true)
      setMaxLength(restrictions.max_length)
      setMaxWidth(restrictions.max_width)
      setMaxHeight(restrictions.max_height)
      setMinLength(restrictions.min_length)
      setMinWidth(restrictions.min_width)
      setMinHeight(restrictions.min_height)
      setRibsStatus(restrictions.ribs_status)
      setVhRation(restrictions.vh_ration)
      setFacadeRatio(restrictions.facade_ratio)
    }
  }, [restrictions])

  const handlerMaxWidth = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );


    if (!isNaN(_value) && String( _value ).length <= 4 )  {
      
      if ( _value === 0 ){
        setMaxWidth( '' );
      } else {
        setMaxWidth( String(_value) );
      }

    }

  } 

  const handlerMaxHeight = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 4 )  {
      
      if ( _value === 0 ){
        setMaxHeight( '' );
      }else{
        setMaxHeight( String(_value) )
      }

      

    }

  } 



  const handlerMinWidth = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 4 )  {
      
      if ( _value === 0 ){
        setMinWidth( '' );
      }else{
        setMinWidth(String(_value))
      }

    }

  } 

  const handlerMinHeight = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 4 )  {
      
      if ( _value === 0 ){
        setMinHeight( '' );
      }else{
        setMinHeight(String(_value))
      }

    }

  } 


  const handlerFacadeRatio = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 3 )  {

      if ( _value === 0 ){
        setFacadeRatio( '' );
      }else{
        setFacadeRatio(String(_value))
      }

    }

  }

  const handlerVhRatio = ( value: number ) => {

    const _value = Number( String(value).replace (/\D/, '') );

    if (!isNaN(_value) && String( _value ).length <= 3 )  {
      
      if ( _value === 0 ){
        setVhRation( '' );
      }else{
        setVhRation(String(_value))
      }

    }

  }

  return (
    <div className='restrictions'>
      <div className="page-title">Ограничения</div>
      <div className="restrictions__list">
        <div className="restriction">
          <div className="page-subtitle">Максимальные габариты конструкции</div>
          <div className="restriction__inputs">
            <div className="profile-section__input_third">
              <Input type={'number'} title="Ширина, мм" isRequired={true} isLittle={false} value={maxWidth} onchange={(value: number) => { handlerMaxWidth(value) }} length={5} />
            </div>
            <div className="profile-section__input_third">
              <Input type={'number'} title="Высота, мм" isRequired={true} isLittle={false} value={maxHeight} onchange={(value: number) => { handlerMaxHeight(value) }} length={5} />
            </div>
            <div className="profile-section__input_third">
              <Input type={'number'} title="Глубина, мм" isRequired={true} isLittle={false} value={maxLength} onchange={(value: number) => { setMaxLength( String(value) ) }} length={5} disabled={true} />
            </div>
          </div>
        </div>
        <div className="restriction">
          <div className="page-subtitle">Минимальные габариты конструкции</div>
          <div className="restriction__inputs">
            <div className="profile-section__input_third">
              <Input type={'number'} title="Ширина, мм" isRequired={true} isLittle={false} value={minWidth} onchange={(value: number) => { handlerMinWidth(value) }} length={5} />
            </div>
            <div className="profile-section__input_third">
              <Input type={'number'} title="Высота, мм" isRequired={true} isLittle={false} value={minHeight} onchange={(value: number) => { handlerMinHeight(value) }} length={5} />
            </div>
            <div className="profile-section__input_third">
              <Input type={'number'} title="Глубина, мм" isRequired={true} isLittle={false} value={minLength} onchange={(value: number) => { setMinLength(String(value)) }} length={5} disabled={true} />
            </div>
          </div>
        </div>
        <div className="restriction">
          <div className="page-subtitle">Минимальное отношение количества фасадов к общему количестве фасадов грани</div>
          <div className="restriction__inputs">
            <div className="profile-section__input_third">
              <Input type={'number'} title="A, %" isRequired={true} isLittle={false} value={facadeRatio} onchange={(value: number) => handlerFacadeRatio(value)} length={4} />
            </div>
          </div>
        </div>
        <div className="restriction">
          <div className="page-subtitle">Минимальное отношение количества вертикальных панелей к количеству панелей всех граней - B %</div>
          <div className="restriction__inputs">
            <div className="profile-section__input_third">
              <Input type={'number'} title="B, %" isRequired={true} isLittle={false} value={vhRation} onchange={(value: number) => handlerVhRatio(value)} length={4} />
            </div>
          </div>
        </div>
        <div className="restriction">
          <div className="page-subtitle">Не допускать нависающих конструкций. Все конструкции должны быть с ребрами снизу</div>
          <div className="restriction__inputs">
            <Switch isRequired={true} title={'Статус'} statusOn={'Включено'} statusOff={'Выключено'} status={ribsStatus} onchange={() => { setRibsStatus(!ribsStatus) }} />
          </div>
        </div>
      </div>
      <div className="button-container">
        <div className="button button_primary" onClick={handleUpdateRestrictions}>Сохранить</div>
      </div>
    </div>
  )
}

export default Restrictions