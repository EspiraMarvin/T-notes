import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

export default function DashFooter() {

    const navigate = useNavigate()
    const { pathName } = useLocation()

    const onGoHomeClicked =() => navigate('/dash')

    let goHomeButton = null
    if (pathName !== '/dash') {
        goHomeButton =(
            <button 
              className='dash-footer__button icon-button'
              title='Home'
              onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            { goHomeButton }
          <p>Current User:</p>
          <p>Status:</p>
        </footer>
    )
  return content
}
