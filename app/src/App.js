import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Landing from './components/Landing';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* public routes  */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        {/* end of ppublic routes  */}


      {/* protected routes */}
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>


          <Route element={<Prefetch />}>

          
            
          <Route path="dash" element={<DashLayout />}>
            
            <Route index element={<Welcome />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
              <Route path="users">
                <Route index element={<UsersList />}  />
                <Route path=":id" element={<EditUser />}  />
                <Route path="new" element={<NewUserForm />}  />
              </Route>
            </Route>


            <Route path="notes">
              <Route index element={<NotesList />}  />
              <Route path=":id" element={<EditNote />}  />
              <Route path="new" element={<NewNote />}  />
            </Route>
            
          </Route> {/* End Dash layout*/}
          
          </Route>
        
        </Route>
      {/* end of protected routes */}
        
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
