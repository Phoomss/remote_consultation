import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register';
import AdminLayout from './layouts/AdminLayout'
import OfficerLayout from './layouts/OfficerLayout'
import PhysicianLayout from './layouts/PhysicianLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import OfficerDashboardPage from './pages/officer/OfficerDashboardPage';
import PhysicianDashboardPage from './pages/physician/PhysicianDashboardPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import OfficerContentPage from './pages/officer/OfficerContentPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loading' element={<Loading />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
          <Route path='/admin/content' element={<AdminContentPage />} />
        </Route>
        <Route element={<OfficerLayout />}>
          <Route path='/officer/dashboard' element={<OfficerDashboardPage />} />
          <Route path='/officer/content' element={<OfficerContentPage />} />
        </Route>
        <Route element={<PhysicianLayout />}>
          <Route path='/physician/dashboard' element={<PhysicianDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
