import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Setting from './pages/Settings';
import Users from './pages/Users';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to='/dashboard'></Navigate>}
            />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/cabins' element={<Cabins />} />
            <Route path='/settings' element={<Setting />} />
            <Route path='/users' element={<Users />} />
            <Route path='/account' element={<Account />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
