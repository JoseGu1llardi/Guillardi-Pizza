import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

type RouteDetailParams = {
    Order: {
        table: string | number;
        order_id: string;
        clientName?: string;
    }
}

type OrderRouteParams = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteParams>();

    const { table, order_id, clientName } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Table {route.params.table}</Text>
                <TouchableOpacity>
                    <Feather name='trash-2' size={28} color='#FF3F4B' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pepperoni pizza</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantity</Text>
                <TextInput
                    style={[styles.input,
                    {
                        width: '60%', textAlign: 'center',
                    }]}
                    placeholderTextColor='#FFF'
                    keyboardType='numeric'
                    value='1'
                />
            </View>

        </SafeAreaView>
    )
}