// import React from 'react'
// import { Route, Routes,RequireAuth, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './components/Login'
// import Signup from './components/Signup'
// import Myresultpage from './pages/Myresultpage'
// //private protected router

// function RequireAuth({ children }) {
//   const isLoggedIn = Boolean(localStorage.getItem("authToken"));
//   const location = useLocation();

//   if (!isLoggedIn) {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: location }}
//         replace
//       />
//     );
//   }

//   return children;
// }


// function App() {
//   return (
//     <div>
//      <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/signup" element={<Signup/>}/>
//         <Route path="/signup" element={
//           <RequireAuth>
//            <Myresultpage/>
//           </RequireAuth>
//         }/>
       
//      </Routes>
  
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Myresultpage from './pages/Myresultpage'

// Private Route Component
function RequireAuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        {/* Protected Route */}
        <Route path="/result" element={
          <RequireAuth>
            <Myresultpage/>
          </RequireAuth>
        }/>
     </Routes>
    </div>
  )
}

export default App

