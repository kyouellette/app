import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
// import {AuthData, authService} from '../services/authService';

type AuthContextData = {
    user?: string;
    signIn(email: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    signOut(): void;
  };
      
  type AuthData = {
    token: string;
    email: string;
    name: string;
  };


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        setUser(await user.getIdToken());
      } else {
        setUser('');
      }
    })
    return unsubscribe;
  })

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    auth.signOut();
  };

  const signUp = async (email: string, password: string) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    setUser(await user.user.getIdToken());
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{user, signIn, signOut, signUp}}>
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