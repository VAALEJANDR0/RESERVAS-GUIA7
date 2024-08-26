import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/components/HomeScreen';
import ReservationScreen from './src/components/ReservationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Reservas' }} />
        <Stack.Screen name="Reservation" component={ReservationScreen} options={{ title: 'Nueva Reserva' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
