import React, {createContext, useState, useContext, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthData, authService} from '../services/authService';

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
  };
      
  type AuthData = {
    token: string;
    email: string;
    name: string;
  };


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  
  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    AsyncStorage.setItem('userToken', authData?.token || '');
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.

    // const _authData = await authService.signIn(
    //   'lucasgarcez@email.com',
    //   '123456',
    // );

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack

    // setAuthData(_authData);
  };

  const signOut = async () => {
    AsyncStorage.removeItem('userToken');
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
  };

  const signUp = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }