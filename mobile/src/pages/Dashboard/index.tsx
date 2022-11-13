import { useContext } from 'react';

import { View, Text, Button } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Dashboard</Text>

      <Button title="Sign Out"onPress={signOut} />
      
    </View>
  )
}