import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

export default function ReservationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');
  const [section, setSection] = useState('No Fumadores');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate.toLocaleString());
    hideDatePicker();
  };

  const handleSaveReservation = async () => {
    const peopleNumber = parseInt(people);

    if (!name || !date || !people || !section) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (isNaN(peopleNumber) || peopleNumber <= 0) {
      Alert.alert('Error', 'La cantidad de personas debe ser un número positivo.');
      return;
    }

    const newReservation = {
      name,
      date,
      people: peopleNumber,
      section,
    };

    const storedReservations = await AsyncStorage.getItem('reservations');
    const reservations = storedReservations ? JSON.parse(storedReservations) : [];

    reservations.push(newReservation);
    await AsyncStorage.setItem('reservations', JSON.stringify(reservations));

    Alert.alert('Éxito', 'Reserva guardada con éxito');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      />
      
      <TouchableOpacity onPress={showDatePicker} style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}>
        <Text>{date ? date : "Seleccionar Fecha y Hora"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <TextInput
        placeholder="Cantidad de Personas"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      />
      
      <Picker
        selectedValue={section}
        onValueChange={(itemValue) => setSection(itemValue)}
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      >
        <Picker.Item label="No Fumadores" value="No Fumadores" />
        <Picker.Item label="Fumadores" value="Fumadores" />
      </Picker>

      <Button title="Guardar Reserva" onPress={handleSaveReservation} />
    </View>
  );
}
