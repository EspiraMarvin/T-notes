import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'

export default function EditUser() {
  const { id } = useParams()

  // const user = useSelector(state => selectUserById(state, id))
  const { user } = useGetUsersQuery("usersList",  {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  })

  if (!user) return <PulseLoader color={"#FFF"} />

  const content = <EditUserForm user={user} /> 

  return content
}
