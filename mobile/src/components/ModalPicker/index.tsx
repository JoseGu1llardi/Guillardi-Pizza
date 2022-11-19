import { } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { CategoryProps } from '../../pages/Order';

import { styles } from './styles';

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

export default function ModalPicker({ options, selectedItem, handleCloseModal }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }

    const option = options.map((item, index) => (
        <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onPressItem(item)}
        >
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity >
    ));

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleCloseModal}
        >
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}