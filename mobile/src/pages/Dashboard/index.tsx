import { useContext, useState } from 'react';

import { Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamsList } from '../../routes/app.routes';

import { styles } from './styles';

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [table, setTable] = useState('');
  const [clientName, setClientName] = useState('');

  async function openOrder() {

    if (!table) {
      alert('Please enter the number of a table!');
      return
    }

    // Make the request, open the table and navigate to the next screen
    navigation.navigate('Order', {
      table: table,
      order_id: 'b7763d1b-1993-44dd-86ee-ab6dd59f5db6',
      clientName: clientName,
    });
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
        value={clientName}
        onChangeText={setClientName}
      />

      <TouchableOpacity style={styles.btn} onPress={openOrder}>
        <Text style={styles.btnText}>Open table</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}