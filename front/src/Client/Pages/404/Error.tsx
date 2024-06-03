import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()
  return (
    <div className="error container">
      <div className="error__content">
        <div className='error__title page-title'>Ошибка 404</div>
        <div className="error__subtitle">Страница не найдена или не существует.</div>
        <div className="button-container">
          <div onClick={() => navigate('/')} className="button button_primary">На главную</div>
        </div>
      </div>

    </div>
  )
}

export default Error