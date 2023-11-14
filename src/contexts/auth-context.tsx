import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import { userPostRequest, userGetRequest, walletPostRequest, walletGetRequest, getTwitchChannelName, twitchStartupPostRequest, userPatchRequest } from '../api/api';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
// import {AuthData, authService} from '../services/authService';

type AuthContextData = {
    user: User | null | undefined;
    signIn(email: string, password: string): Promise<void>;
    signUp({email, password, firstName, lastName, username}: CreateUserType): Promise<void>;
    signOut(): void;
    saveTwitchDetails(code: string): void;
    unLinkTwitch(): void;
    loading: boolean;
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
    twitchLinked?: boolean;
  }


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Set the initial loading state to true
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setLoading(true); // Set loading to true when starting to fetch user data

      if (authUser?.uid) {
        try {
          const userData = await userGetRequest(`get/${authUser.uid}`, {});
          const walletData = await walletGetRequest(`${authUser.uid}`, {});
          setUser({
            userId: userData?.userId,
            username: userData?.username,
            balance: walletData?.balance,
            twitchLinked: userData?.twitchAccessToken ? true : false,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching user data, whether successful or not
        }
      } else {
        setUser(null);
        setLoading(false); // Set loading to false if there is no authenticated user
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        try {
          const wallet = await walletGetRequest(user.userId, {});

          if (wallet && user.balance !== wallet.balance) {
            setUser((prevUser) => ({
              ...prevUser,
              balance: wallet.balance,
            }));
          }
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      }
    };

    fetchData();
    // You can specify dependencies here if needed
  }, [user?.userId]);


  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    auth.signOut();
  };

  const saveTwitchDetails = async (code: string) => {
    try {
      const { access_token, refresh_token} = await twitchStartupPostRequest(code);
      const twitchUsername = await getTwitchChannelName(access_token);
      userPatchRequest('/twitch/add', {userId: user?.userId, twitchAccessToken: access_token, twitchRefreshToken: refresh_token, twitchUsername });
      setUser({...user, twitchLinked: true});
    } catch (error) {
  
    }
  }

  const unLinkTwitch = async () => {
    try {
      userPatchRequest('/twitch/add', {userId: user?.userId, twitchAccessToken: null, twitchRefreshToken: null, twitchUsername: null });
      setUser({...user, twitchLinked: false});
    } catch (error) {

    }
  }

  const signUp = async ({email, password, firstName, lastName, username}: CreateUserType) => {
    try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userId = user.user.uid;
    if (email && firstName && lastName && username && userId) {
    const createdUser = await userPostRequest('/create', {email, firstName, lastName, username, userId});
    setUser({...user, userId: createdUser?.id, username: createdUser.username})
    }
    if (userId) {
    const createdWallet = await walletPostRequest('/create', {userId});
    setUser({...user, balance: createdWallet?.balance})
    }
    } catch (error) {

    }
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{user, signIn, signOut, signUp, loading, saveTwitchDetails, unLinkTwitch}}>
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