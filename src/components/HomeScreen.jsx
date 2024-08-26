import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const storedReservations = await AsyncStorage.getItem('reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReservations();
    }, [])
  );

  const handleDeleteReservation = async (index) => {
    Alert.alert(
      'Eliminar Reserva',
      '¿Estás seguro de que deseas eliminar esta reserva?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: async () => {
            const updatedReservations = reservations.filter((_, i) => i !== index);
            setReservations(updatedReservations);
            await AsyncStorage.setItem('reservations', JSON.stringify(updatedReservations));
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Nueva Reserva" onPress={() => navigation.navigate('Reservation')} />
      <FlatList
        data={reservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onLongPress={() => handleDeleteReservation(index)}
            style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
          >
            <Text>Nombre: {item.name}</Text>
            <Text>Fecha y Hora: {item.date}</Text>
            <Text>Cantidad de Personas: {item.people}</Text>
            <Text>Sección: {item.section}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
