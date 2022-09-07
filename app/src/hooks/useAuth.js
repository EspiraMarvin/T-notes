import { useSelector } from 'react-redux'
import { selectCurreToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'


const useAuth = () => {
    const token = useSelector(selectCurreToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"


    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Adminb"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status }

}

export default useAuth
