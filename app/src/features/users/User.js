import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'


export default function User({ userId }) {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user){
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        
        const userRoleString = user.roles.toString().replaceAll(',', ',') // pulling all roles from the roles array to a string

        const cellStatus = user.active ? ' ' : 'table__cell--inactive' // set inactive/active class to the user

        return (
          <tr className='table__row user'>
            <td className={`table__cell ${cellStatus}`}>{ user.username }</td>
            <td className={`table__cell ${cellStatus}`}>{ userRoleString }</td>
            <td className={`table__cell ${cellStatus}`}>
              <button 
                className='icon-button table__button'
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </td>
          </tr>
      )

    } else return null

 
}
