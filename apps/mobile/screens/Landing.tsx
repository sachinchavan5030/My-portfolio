import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Foundation, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import About from '../src/features/about/AboutScreen'
import Skill from '../src/features/skill/SkillScreen'
import Project from '../src/features/project/ProjectScreen'
import Contact from '../src/features/contact/ContactScreen'
import HomeScreen from '../src/features/home/HomeScreen'
import Exprience from '../src/features/exprience/ExprienceScreen'
import LoginScreen from '../src/features/login/LoginScreen'
import { colors } from '../src/styles/theme'
const Landing = () => {
    const Tab = createBottomTabNavigator()
    const isDark = useColorScheme() === 'dark'
    const c = isDark ? colors.dark : colors.light
    return <>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border } }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: () => <MaterialCommunityIcons name="home-outline" size={24} color={c.primary} /> }} />
            <Tab.Screen name='About' component={About} options={{ tabBarIcon: () => <Entypo name="user" size={24} color={c.primary} /> }} />
            <Tab.Screen name='Skill' component={Skill} options={{ tabBarIcon: () => <Foundation name="social-skillshare" size={24} color={c.primary} /> }} />
            <Tab.Screen name='Project' component={Project} options={{ tabBarIcon: () => <AntDesign name="project" size={24} color={c.primary} /> }} />
            <Tab.Screen name='Contact' component={Contact} options={{ tabBarIcon: () => <AntDesign name="contacts" size={24} color={c.primary} /> }} />
            <Tab.Screen name='Exprience' component={Exprience} options={{ tabBarIcon: () => <AntDesign name="schedule" size={24} color={c.primary} /> }} />
            <Tab.Screen name='Login' component={LoginScreen} options={{ tabBarIcon: () => <Ionicons name="log-in-outline" size={24} color={c.primary} /> }} />
        </Tab.Navigator>
    </>
}

export default Landing

const styles = StyleSheet.create({})