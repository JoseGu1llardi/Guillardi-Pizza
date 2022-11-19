import { useState, useEffect } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api';

import { styles } from './styles';

import ModalPicker from '../../components/ModalPicker';

type RouteDetailParams = {
    Order: {
        table: string | number;
        order_id: string;
        name?: string;
    }
}


export type CategoryProps = {
    id: string;
    name: string;
}

type OrderRouteParams = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteParams>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [amount, setAmount] = useState('1');

    const { table, name } = route.params;

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category');

            setCategory(response.data);
            setCategorySelected(response.data[0]);

        }

        loadInfo();

    }, []);

    async function handleCloseOrder() {

        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            });

            navigation.goBack();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Table {table}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name='trash-2' size={28} color='#FF3F4B' />
                </TouchableOpacity>
            </View>

            {
                category.length !== 0 && (
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setModalCategoryVisible(true)}
                    >
                        <Text style={{ color: '#FFF' }}>
                            {categorySelected?.name}
                        </Text>
                    </TouchableOpacity>
                )
            }

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
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.btnAdd}>
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Advance</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={() => { }}
                />

            </Modal>

        </SafeAreaView>
    )
}