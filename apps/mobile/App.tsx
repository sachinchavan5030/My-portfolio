import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import Feature1 from './screens/Feature1'

const App = () => {
  const Stack = createNativeStackNavigator()
  return <Provider store={reduxStore}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='feature1' component={Feature1} />
        {/* <Stack.Screen name='home' component={Home} /> */}
        <Stack.Screen name='landing' component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}

export default App

const styles = StyleSheet.create({})