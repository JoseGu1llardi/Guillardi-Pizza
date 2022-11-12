import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function SignIn() {
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
                />

                <TextInput
                    placeholder="Enter your password"
                    style={styles.input}
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E'
    },
    logo: {
        marginBottom: 18
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 34,
        paddingHorizontal: 14,
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#a3a0a0'
    },
    btn: {
        width: '95%',
        height: 40,
        backgroundColor: '#3FFFa3',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026',
    },
});