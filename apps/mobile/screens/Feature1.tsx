// App.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { AppNavigation } from "../types/Navigation";
import { Entypo } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export const App = () => {
    const { navigate } = useNavigation<AppNavigation>()
    useEffect(() => {
        async function prepare() {
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec delay
            await SplashScreen.hideAsync();
        }

        prepare();
    }, []);

    return <>

        <View style={styles.container}>
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png" }}
                style={styles.logo}
            />
            <Text style={styles.text}>Welcome to My Portfollio</Text>
            <Button style={{ marginTop: 20 }} mode="text" onPress={() => navigate("landing")}> <Entypo name="arrow-long-right" size={30} color="white" /></Button>
        </View>
        <View>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        tintColor: "#fff",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default App