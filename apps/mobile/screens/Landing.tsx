import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'
import About from './About'
import Skill from './Skill'
import Project from './Project'
import Contact from './Contact'
import HomeScreen from './Home'
import Exprience from './Exprience'
const Landing = () => {
    const Tab = createBottomTabNavigator()
    return <>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: () => <MaterialCommunityIcons name="home-outline" size={24} color="black" /> }} />
            <Tab.Screen name='About' component={About} options={{ tabBarIcon: () => <Entypo name="user" size={24} color="black" /> }} />
            <Tab.Screen name='Skill' component={Skill} options={{ tabBarIcon: () => <Foundation name="social-skillshare" size={24} color="black" /> }} />
            <Tab.Screen name='Project' component={Project} options={{ tabBarIcon: () => <AntDesign name="project" size={24} color="black" /> }} />
            <Tab.Screen name='Contact' component={Contact} options={{ tabBarIcon: () => <AntDesign name="contacts" size={24} color="black" /> }} />
            <Tab.Screen name='Exprience' component={Exprience} options={{ tabBarIcon: () => <AntDesign name="schedule" size={24} color="black" /> }} />
        </Tab.Navigator>
    </>
}

export default Landing

const styles = StyleSheet.create({})