import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { drimoAPI } from '../../../services/DrimoService'
import { useAppDispatch } from '../../../store/hooks/redux'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { LeftSmallRedArrow } from '../../../UIkit/Icons'
import Input from '../../../UIkit/Inputs/Input'

function AddSolution() {

  const [solutionId, setId] = useState<string>('')
  const { id } = useParams()
  const [valid, setValid] = useState(false)
  const [createSolution, { error }] = drimoAPI.useCreateSolutionMutation()
  const [updateSolution] = drimoAPI.useUpdateSolutionMutation()
  const { data: solution, refetch } = drimoAPI.useFetchSolutionQuery({ id: solutionId, params: '', order : '' })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notificate } = notificationsSlice.actions
  error && dispatch(notificate({ title: 'Ошибка', isShown: true }))

  React.useEffect( () => {
    refetch();
  }, [solutionId] );

  const handleId = (value: string) => {
    setId(String(value).replace(/[^\d]/g, ''))
    setValid(false)
  }

  const handleCreateMethod = async () => {
    let data = new FormData()
    data.append("length", '0')
    data.append("width", '0')
    data.append("height", '0')
    data.append("weight", '0')
    data.append('title', 'Решение-заглушка')
    data.append('subcategory_id', String(id))

    console.log( 'solutionId: ' + solutionId );

    if ( Number(solutionId) > 0) {
      
      console.log( solution );

      if ( solution !== null && solution !== undefined && solution.id > 0 ){ //Решение было найдено

        let data = new FormData()
        data.append("title", solution.name);
        data.append("image", solution.image);
        data.append("file", solution.file);
        data.append("ar_file", solution.ar_file);
        data.append("subcategory_id", String(id));
        data.append("length", String(solution.length));
        data.append("width",  String(solution.width));
        data.append("height", String(solution.height));
        data.append("weight", String(solution.weight));
        data.append("user_id", String( 1 ));

        await updateSolution( { formData : data, id : solution.id } );

        setValid(true)

        dispatch(notificate({ title: 'Сохранено', isShown: true }))

        navigate(-1)

      }
      else {
        dispatch(notificate({ title: 'Ошибка', isShown: true }))
      }

    } else {
      dispatch(notificate({ title: 'Ошибка', isShown: true }))
      // await createSolution(data);
      // dispatch(notificate({ title: 'Сохранено', isShown: true }))
      // navigate(-1)
     
    }
  }

  const description__inputs_styles = {
    marginTop: "8px",
    fontFamily: "Helvetica",
    color: "#A1A1A1",
  };

  return (
    <div className="delivery-page">
      <div className="delivery-page__header">
        <div className="button-container">
          <div onClick={() => { navigate(-1) }} className="button button_text">
            <LeftSmallRedArrow />
            Подкатегория
          </div>
        </div>
        <div className="page-title">Добавить готовое решение</div>
      </div>
      <div className="delivery-page__inputs">
        <Input isRequired={true} title={'ID'} isLittle={false} value={solutionId} onchange={handleId} length={10} valid={valid} />
      </div>
      {/*<div className="description__inputs" style={ description__inputs_styles }>
        Оставьте поле пустым, чтобы создать новое решение к этой категории.
      </div>*/}
      <div className="category__buttons">
        <div className="button-container">
          <div className="button button_primary" onClick={handleCreateMethod}>Добавить</div>
        </div>
        <div className="button-container">
          <div className="button button_secondary" onClick={() => { navigate(-1) }}>Отмена</div>
        </div>
      </div>
    </div >
  )
}

export default AddSolution