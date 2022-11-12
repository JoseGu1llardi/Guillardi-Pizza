import { useContext } from 'react';

import { View, ActivityIndicator } from 'react-native';

import AppRoutes from '../routes/app.routes';
import AuthRoutes from '../routes/auth.routes';

import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
    const { isAuthenticated } = useContext(AuthContext);

    const loading = false;

    if (loading) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#1D1D2E',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <ActivityIndicator size={60} color='#F5F7FB' />
            </View>
        )
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}