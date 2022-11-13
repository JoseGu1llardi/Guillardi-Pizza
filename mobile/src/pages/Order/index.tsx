import { SafeAreaView, Text, } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

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
        <SafeAreaView>
            <Text>Screen Order</Text>
            <Text>{ table }</Text>
            <Text>{ order_id }</Text>
            <Text>{ clientName }</Text>
        </SafeAreaView>
    )
}