import { useState, useEffect } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api';

import { styles } from './styles';

import ModalPicker from '../../components/ModalPicker';
import ListItem from '../../components/ListItem';

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

type ProductProps = {
    id: string;
    name: string;
}

export type ItemProps = {
    id: string;
    name: string;
    amount: string | number;
}

type OrderRouteParams = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteParams>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);


    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<CategoryProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');

    const [items, setItems] = useState<ItemProps[]>([]);

    const { table, name } = route.params;

    useEffect(() => {
        async function loadCategory() {
            const response = await api.get('/category');

            setCategory(response.data);
            setCategorySelected(response.data[0]);

        }

        loadCategory();

    }, []);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            });

            setProducts(response.data);
            setProductSelected(response.data[0]);

        }

        loadProducts();

    }, [categorySelected]);

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

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    function handleAddItem() {

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

            {
                products.length !== 0 && (
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setModalProductVisible(true)}
                    >
                        <Text style={{ color: '#FFF' }}>
                            {productSelected?.name}
                        </Text>
                    </TouchableOpacity>
                )
            }

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
                <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={handleAddItem}
                >
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { opacity: items.length === 0 ? 0.5 : 1 }]}
                    disabled={items.length === 0}
                >
                    <Text style={styles.btnText}>Advance</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ListItem data={item} />}
            />

            <Modal
                transparent
                visible={modalCategoryVisible}
                animationType='slide'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />

            </Modal>

            <Modal
                transparent
                visible={modalProductVisible}
                animationType='slide'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </SafeAreaView>
    )
}