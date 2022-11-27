import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons'

import { styles } from './styles';

interface ItemProps {
    data: {
        id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}

export default function ListItem({ data, deleteItem }: ItemProps) {

    function handleDeleteIcon() {
        deleteItem(data.id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} - {data.name}</Text>

            <TouchableOpacity onPress={handleDeleteIcon}>
                <Feather name="trash-2" color="#FF3F4B" size={24} />
            </TouchableOpacity>
        </View>
    )
}