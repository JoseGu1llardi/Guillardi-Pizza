import { } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { CategoryProps } from '../../pages/Order';

import { styles } from './styles';

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: () => void;
}

export default function ModalPicker({ options, selectedItem, handleCloseModal }: ModalPickerProps) {
    return (
        <View>
            <Text>Modal Picker</Text>
        </View>
    )
}