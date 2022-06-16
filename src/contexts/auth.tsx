import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

type AuthContextProps = {
  isAuthenticated: boolean, 
  loading: boolean, 
  user?: any, 
  logout?: any
}
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false, 
  loading: false, 
});
import {isLoggedIn} from 'src/lib/auth/client'

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // Prevent Expected server HTML to contain a matching

    useEffect(() => {
      // Load user from cookie
      // setUser(user)
      setLoading(false)

    }, [])

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        window.location.pathname = '/auth/login'
    }

    return (
      <AuthContext.Provider value={{ isAuthenticated: isLoggedIn(), loading, user, logout }}>
          {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();
  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  // Run only on client side
  if ((!isAuthenticated &&  window.location.pathname !== '/auth/login')){
    window.location.pathname = '/auth/login'
    return null
  }
  return children;
};

export const PublicOnlyRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();

  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  // Run only on client side
  if (isAuthenticated &&  window.location.pathname !== '/'){
    window.location.pathname = '/'
    return null
  }
  return children;
};