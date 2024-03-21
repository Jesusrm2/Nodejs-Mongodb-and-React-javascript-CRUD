import {BrowserRouter,Routes, Route} from 'react-router-dom'

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import TaskPage from './pages/TaskPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import NavBar from './components/NavBar';

function App() {
  return (
  <AuthProvider>
    <TaskProvider>
    <BrowserRouter>
     <main className="container mx-auto px-10">
     <NavBar/>
     <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
       <Route element={<ProtectedRoute/>}>
       <Route path='/task' element={<TaskPage/>}></Route>
        <Route path='/add-task' element={<TaskFormPage/>}></Route>
        <Route path='/task/:id' element={<TaskFormPage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
       </Route>
        
      </Routes>
     </main>
    </BrowserRouter>
    </TaskProvider>
     
  </AuthProvider>
   
  )
}
export default App