import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";

import { useHistory, useLocation } from "react-router-dom";
import * as sessionsApi from "./api/sessions";
import { IUser } from "./models/IUser";

interface AuthContextType {
    user?: IUser;
    loading: boolean;
    error?: any;
    registration: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
{} as AuthContextType
);


export function AuthProvider({ children }: { children: ReactNode; }): JSX.Element {
    const [user, setUser] = useState<IUser>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const history = useHistory();
    const location = useLocation();
  
    useEffect(() => {
      if (error) {setError(null)};
    }, [location.pathname]);
  
    useEffect(() => {
      if (localStorage.getItem('token'))
        sessionsApi.checkAuth()
          .then((data) => {
            localStorage.setItem('token', data.accessToken)
            setUser(data.user)
          })
          .catch((_error) => {
          })
          .finally(() => {
            setLoadingInitial(false)
          })
      else 
          setLoadingInitial(false)
    }, []);

    function login(email: string, password: string) {
      setLoading(true);
  
      sessionsApi.login({ email, password })
        .then((data) => {
            localStorage.setItem("token", data.accessToken)
            setUser(data.user);
            history.push("/");
        })
        .catch((_error) => { setError(_error.response.data.message)})
        .finally(() => setLoading(false));
    }
  

    function registration(email: string, password: string) {
      setLoading(true);
  
      sessionsApi.registration({ email, password })
        .then((data) => {
          localStorage.setItem("token", data.accessToken)
          setUser(data.user);
          history.push("/");
        })
        .catch((_error) => {setError(_error.response.data.message); console.log(_error.response.data)})
        .finally(() => setLoading(false));
    }
  
    function logout() {
        sessionsApi.logout().then(() =>{ 
            setUser(undefined)
            localStorage.removeItem('token')
        });
    }
  
    const memoedValue = useMemo(
      () => ({
        user,
        loading,
        error,
        login,
        registration,
        logout,
      }),
      [user, loading, error]
    );
  
    return (
      <AuthContext.Provider value={memoedValue}>
        {!loadingInitial && children}
      </AuthContext.Provider>
    );
  }

export default function useAuth() {
  return useContext(AuthContext);
}