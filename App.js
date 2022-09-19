import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Button, Alert } from 'react-native';

const App = () => {

  const [pokemones, setPokemones] = useState([])
  const [anterior, setAnterior] = useState(null)
  const [siguiente, setSiguiente] = useState(null)
  const [actual, setActual] = useState(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)



  const apiCall = async () => {
    const resolve = await fetch(actual)
    const result = await resolve.json()

    setPokemones(result.results)
    setAnterior(result.previous)
    setSiguiente(result.next)

  }
  useEffect(() => {
    apiCall()
  }, [actual])


  const renderItem = ({ item }) => (
    <Text>{item.name}</Text>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={pokemones}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <Button onPress={() => siguiente !== null && setActual(anterior)} title='Anteriores' />
        <Button onPress={() => siguiente !== null && setActual(siguiente)} title='Siguientes' />


      </View>

    </SafeAreaView>
  )
}

export default App;
