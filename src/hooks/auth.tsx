import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface SignInCredentials { email: string; password: string; }

interface User {
    name: string;
    id: string;
    avatar_url: string;
    email: string;
}

interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): Promise<void>
    updateUser(user: User): Promise<void>;
}

interface AuthState { token: string, user: User }

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ])
    
            if(token[1] && user[1]){
                api.defaults.headers.authorization = `Bearer ${token[1]}`; 
                setData({ token: token[1], user: JSON.parse(user[1]) });
            }
            setLoading(false);
                
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(async({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)]
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(async() => {
        await AsyncStorage.multiRemove([ '@GoBarber:token', '@GoBarber:user' ]);

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(async(user: User) => {
        await AsyncStorage.setItem("@GoBarber:user", JSON.stringify(user));

        setData({
            token: data.token,
            user,
        })
    }, [setData, data.token]);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading, updateUser }} >
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth (): AuthContextData {
    const context = useContext(AuthContext);

    if(!context)
        throw new Error('Context does not exists');

    return context;
}