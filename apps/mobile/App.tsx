import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './screens/Landing'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import SplashScreenComponent from './src/features/splash/SplashScreen'
import LoginScreen from './src/features/login/LoginScreen'
import AdminDashboard from './src/features/admin/AdminDashboard'
import AdminAbout from './src/features/admin/AdminAbout'
import AdminSkill from './src/features/admin/AdminSkill'
import AdminExprience from './src/features/admin/AdminExprience'
import AdminProject from './src/features/admin/AdminProject'

const App = () => {
  const Stack = createNativeStackNavigator()
  return <Provider store={reduxStore}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='splash' component={SplashScreenComponent} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='landing' component={Landing} />
        <Stack.Screen name='adminDashboard' component={AdminDashboard} />
        <Stack.Screen name='adminAbout' component={AdminAbout} />
        <Stack.Screen name='adminSkill' component={AdminSkill} />
        <Stack.Screen name='adminExprience' component={AdminExprience} />
        <Stack.Screen name='adminProject' component={AdminProject} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
}

export default App