import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/');
    } catch {
        console.log('Error when logging out')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {
        // Try to get token on cookies
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(res => {
                const { id, name, email } = res.data;

                setUser({
                    id,
                    name,
                    email
                });

            })
                .catch(() => {
                    // If there was an error, logout user
                    signOut();
                })
        }

    }, []);

    async function signIn({ email, password }: SignInProps) {
        try {

            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expire in 1 month
                path: '/' // Wich paths will have access to the cookie
            });

            setUser({
                id,
                name,
                email
            });

            // Pass to the next requests our token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Successfully logged in!');

            // Redirect user to page dashboard
            Router.push('/dashboard');

        } catch (error) {
            toast.error('Error accessing!');
            console.log('Error accessing ', error);
        }
    };

    async function signUp({ name, email, password }: SignUpProps) {
        try {

            const response = await api.post('/users', {
                name,
                email,
                password
            });

            toast.success('Account successfully created.');

            Router.push('/');

        } catch (error) {
            toast.error('Error when registering!')
            console.log('Error');
        }

    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}