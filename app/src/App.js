import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Landing from './components/Landing';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Landing />} />

        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          
          <Route index element={<Welcome />} />

          <Route path="notes">
            <Route index element={<NotesList />}  />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />}  />
          </Route>
          
        </Route> {/* End Dash layout*/}

      </Route>
    </Routes>
  );
}

export default App;
