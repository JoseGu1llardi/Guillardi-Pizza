import { useState, useContext } from 'react';

import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

import { styles } from './styles';

export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSingIn() {

        if (!email || !password) {
            return;
        }

        await signIn({ email, password });

    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter your e-mail"
                    style={styles.input}
                    placeholderTextColor="#FFF"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder="Enter your password"
                    style={styles.input}
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.btn} onPress={handleSingIn}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={25} color="#FFF" />
                        ) : (
                            <Text style={styles.btnText}>Sign in</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}
