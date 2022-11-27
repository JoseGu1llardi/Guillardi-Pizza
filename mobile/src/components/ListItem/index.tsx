import { View, Text } from 'react-native';

import { styles } from './styles';

interface ItemProps {
    data: {
        id: string;
        name: string;
        amount: string | number;
    }
}

export default function ListItem(data: ItemProps) {
    return (
        <View style={styles.container}>
            <Text>Item List</Text>
        </View>
    )
}