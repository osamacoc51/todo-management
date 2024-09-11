import { Navigate } from 'react-router-dom'
import './App.css'
import { ListTodoComponent } from './components/ListTodoComponent'
import { HeaderComponent } from './components/homepage/HeaderComponent'
import { FooterComponent } from './components/homepage/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoComponent } from './components/TodoComponent';
import { Homepage } from './components/homepage/Homepage';
import { RegisterComponent } from './components/auth/RegisterComponent';
import { LoginComponent } from './components/auth/LoginComponent';
import { isUserLoggedIn } from './service/AuthService';

function App() {

  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/login" />;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          {/* <Route path='/list' element={<ListTodoComponent />}></Route> */}

          <Route path='/todos' element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>}></Route>

          <Route path='/add-todo' element={
            <AuthenticatedRoute>
              <TodoComponent /> </AuthenticatedRoute>
          }></Route>
          <Route path='/update-todo/:id' element={
            <AuthenticatedRoute>
              <TodoComponent /> </AuthenticatedRoute>
          }></Route>


          <Route path='/delete-todo/:id' element={
            <AuthenticatedRoute>
              <TodoComponent /></AuthenticatedRoute>}></Route>

          <Route path='/register' element={<RegisterComponent />}></Route>
          <Route path='/login' element={< LoginComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
