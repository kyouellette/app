import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import { userPostRequest, userGetRequest, walletPostRequest, walletGetRequest } from '../api/api';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
// import {AuthData, authService} from '../services/authService';

type AuthContextData = {
    user: User | null | undefined;
    signIn(email: string, password: string): Promise<void>;
    signUp({email, password, firstName, lastName, username}: CreateUserType): Promise<void>;
    signOut(): void;
  };
      
  type AuthData = {
    token: string;
    email: string;
    name: string;
  };

  type CreateUserType = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userId?: string;
    username: string;
  }

  type User = {
    userId?: string;
    username?: string;
    balance?: string;
  }


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await userGetRequest(`get/${user.uid}`, {});
        const walletData = await walletGetRequest(`${user.uid}`, {})
        setUser({
          userId: userData?.userId,
          username: userData?.username,
          balance: walletData?.balance
        });
      } else {
        setUser(null);
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

  const signUp = async ({email, password, firstName, lastName, username}: CreateUserType) => {
    try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userId = user.user.uid;
    const createdUser = await userPostRequest('/create', {email, password, firstName, lastName, userId, username});
    const createdWallet = await walletPostRequest('/create', createdUser.userId);
    setUser({userId: createdUser?.userId, username: createdUser?.username, balance: createdWallet?.balance});
    } catch (error) {
      console.log(error);
    }
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