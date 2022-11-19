import { useContext, useState } from 'react';

import { Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api'

import { styles } from './styles';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [table, setTable] = useState('');
  const [name, setName] = useState('');

  async function openOrder() {

    if (!table) {
      alert('Please enter the number of a table!');
      return
    }

    const response = await api.post('/order', {
      table: Number(table),
      name
    });

    // Make the request, open the table and navigate to the next screen
    navigation.navigate('Order', {
      table: table,
      order_id: response.data.id,
      name
    });

    setTable('');
    setName('');

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New order</Text>

      <TextInput
        style={styles.input}
        placeholder="Table number"
        placeholderTextColor='#F0F0F0'
        keyboardType='numeric'
        value={table}
        onChangeText={setTable}
      />

      <TextInput
        style={styles.input}
        placeholder="Customer name"
        placeholderTextColor='#F0F0F0'
        keyboardType='default'
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.btn} onPress={openOrder}>
        <Text style={styles.btnText}>Open table</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}