import {createContext, useState, useEffect} from 'react';
import authService from '../services/authService';


 export const AuthContext = createContext();

export function AuthProvider({children}) { 
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const user = authService.getCurrentUser();
        if(user) setUser(user)
        setIsLoading(false)
    },[])

    const login = async (email, password) => {
        const user = await authService.login(email, password)
        setUser(user)
        return user
    }

    const logout = () => {
         authService.logout()
        setUser(null)
    }

    const register = async (userData) => {
        return await authService.register(userData)
        
    }

    return (
        <AuthContext.Provider value={{user, isLoading, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthProvider;