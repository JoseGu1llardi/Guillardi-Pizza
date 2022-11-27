import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';

type RouteDetailParams = {
    FinishOrder: {
        table: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

import { styles } from './styles';

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {

        try {
            await api.put('/order/send', {
                order_id: route.params?.order_id
            });

            navigation.popToTop();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Do you want to finalize this order?</Text>
            <Text style={styles.table}>Table {route.params.table}</Text>

            <TouchableOpacity style={styles.btn} onPress={handleFinish}>
                <Text style={styles.btnText}>Finalize order</Text>
                <Feather name="shopping-cart" size={24} color='#1D1D2E' />
            </TouchableOpacity>
        </View>
    )
}