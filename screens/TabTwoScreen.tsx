import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tw from "twrnc";
import SelectDropdown from "react-native-select-dropdown"
import React, { useState } from 'react';

const lokaler = [
  "Hamarkontoret",
  "Høgskolen",
  "Stadsbyen",
]

export default function TabTwoScreen() {
  const [date, setDate] = useState(new Date());
  const [timeArrival, setTimeArrival] = useState();
  const [timeDeparture, setTimeDeparture] = useState();
  const [onIos, setOnIos] = useState(Platform.OS === 'ios');
  const [showIosDate, setShowIosDate] = useState(false)

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    return maxDate;
  }

  return (
    <View style={styles.container}>
      <View style={tw`h-full flex flex-col items-center justify-center px-10 bg-[#f3f3f3]`}>

        <View style={tw`flex justify-center flex-col w-full mb-8`}>
          <Text style={tw`text-lg font-bold`}>Lokale</Text>
          <SelectDropdown
            data={lokaler}
            defaultValue={lokaler[0]}
            buttonStyle={tw`w-full bg-white border-2 border-gray-300 rounded-lg shadow-md mb-5`}
            dropdownStyle={tw`bg-white border-2 border-gray-300 rounded-lg shadow-md mb-5`}
            onSelect={(value) => console.log(value)}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
          <Text style={tw`text-lg font-bold`}>Dato</Text>
          {onIos ? (
            <View style={tw`flex flex-col justify-start items-end`}>
              <TouchableOpacity onPress={() => setShowIosDate(true)}>
                <Text style={tw`text-lg font-bold`}>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                mode="date"
                isVisible={showIosDate}
                onConfirm={() => setShowIosDate(!showIosDate)}
                onCancel={() => setShowIosDate(!showIosDate)}
              />
            </View>
          ) : (
            <TouchableOpacity style={tw`bg-blue-400/30 w-32 rounded px-3.5 py-1.5`} onPress={() => { }}>
              <Text style={tw`text-lg`}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => { }} style={tw`bg-blue-500 px-8 py-3.5 w-full rounded-lg shadow-md`}>
          <Text style={{ textAlign: "center" }}>Book</Text>
        </TouchableOpacity>
        {/* <StatusBar style="auto" /> */}
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
