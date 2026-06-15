import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { colors, spacing, fontSize } from '../../styles/theme'
import { AppNavigation } from '../../../types/Navigation'

SplashScreen.preventAutoHideAsync()

const SplashScreenComponent = () => {
  const { navigate } = useNavigation<AppNavigation>()
  const isDark = useColorScheme() === 'dark'
  const c = isDark ? colors.dark : colors.light

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 3000))
      await SplashScreen.hideAsync()
    }
    prepare()
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }}
        style={[styles.logo, { tintColor: c.text }]}
      />
      <Text style={[styles.text, { color: c.text }]}>Welcome to My Portfolio</Text>
      <Button
        style={{ marginTop: spacing.xl }}
        mode="text"
        onPress={() => navigate('landing')}
      >
        <Entypo name="arrow-long-right" size={30} color={c.text} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.xl,
  },
  text: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
  },
})

export default SplashScreenComponent
