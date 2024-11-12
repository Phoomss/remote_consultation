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
import AdminBookingPage from './pages/admin/AdminBookingPage';
import OfficerBooking from './pages/officer/OfficerBooking';
import AdminQuestionPage from './pages/admin/AdminQuestionPage';
import OfficerQuestion from './pages/officer/OfficerQuestion';
import AdminAnswerPage from './pages/admin/AdminAnswerPage';
import OfficerAnswerPage from './pages/officer/OfficerAnswerPage';

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
          <Route path='/admin/reservation' element={<AdminBookingPage />} />
          <Route path='/admin/assessment/question' element={<AdminQuestionPage />} />
          <Route path='/admin/assessment/answer' element={<AdminAnswerPage />} />
        </Route>
        <Route element={<OfficerLayout />}>
          <Route path='/officer/dashboard' element={<OfficerDashboardPage />} />
          <Route path='/officer/content' element={<OfficerContentPage />} />
          <Route path='/officer/reservation' element={<OfficerBooking />} />
          <Route path='/officer/assessment/question' element={<OfficerQuestion />} />
          <Route path='/officer/assessment/answer' element={<OfficerAnswerPage />} />
        </Route>
        <Route element={<PhysicianLayout />}>
          <Route path='/physician/dashboard' element={<PhysicianDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
