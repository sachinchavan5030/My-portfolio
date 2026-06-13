import React from "react";

import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
    StyleSheet,
    useColorScheme,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useGetProjectQuery } from "../redux/apis/project.api";
import { useGetAboutQuery } from "../redux/apis/about.api";

const ProjectScreen = () => {
    const { data } = useGetProjectQuery();

    const { data: aboutData } =
        useGetAboutQuery();

    const theme = useColorScheme();

    const isDark = theme === "dark";

    const colors = {
        background: isDark
            ? "#0f172a"
            : "#f8fafc",

        card: isDark
            ? "#1e293b"
            : "#ffffff",

        text: isDark
            ? "#ffffff"
            : "#0f172a",

        secondary: isDark
            ? "#94a3b8"
            : "#64748b",

        border: isDark
            ? "#334155"
            : "#e2e8f0",

        button: "#2563eb",
    };

    const projects = data?.result || [];

    const about = aboutData?.result?.[0];

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background,
                },
            ]}
        >
            <FlatList
                data={projects}
                keyExtractor={(
                    item: any
                ) => item._id.toString()}
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.listContainer
                }

                /* Header */
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.heading,
                                {
                                    color:
                                        colors.text,
                                },
                            ]}
                        >
                            My Projects 🚀
                        </Text>

                        <Text
                            style={[
                                styles.subHeading,
                                {
                                    color:
                                        colors.secondary,
                                },
                            ]}
                        >
                            A collection of my
                            recent work and
                            builds.
                        </Text>
                    </View>
                }

                /* Project Card */
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor:
                                    colors.card,

                                borderColor:
                                    colors.border,
                            },
                        ]}
                    >
                        {/* Image */}
                        <Image
                            source={{
                                uri:
                                    item.projectImage ||
                                    "https://via.placeholder.com/300",
                            }}
                            style={styles.image}
                        />

                        {/* Body */}
                        <View
                            style={
                                styles.cardBody
                            }
                        >
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color:
                                            colors.text,
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>

                            <Text
                                style={[
                                    styles.desc,
                                    {
                                        color:
                                            colors.secondary,
                                    },
                                ]}
                            >
                                {item.description}
                            </Text>

                            {/* Buttons */}
                            <View
                                style={
                                    styles.buttonRow
                                }
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.primaryBtn,
                                        {
                                            backgroundColor:
                                                colors.button,
                                        },
                                    ]}
                                    onPress={() =>
                                        Linking.openURL(
                                            item.liveLink as string
                                        )
                                    }
                                >
                                    <Text
                                        style={
                                            styles.btnText
                                        }
                                    >
                                        Live Demo
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={
                                        styles.darkBtn
                                    }
                                    onPress={() =>
                                        Linking.openURL(
                                            item.gitLink as string
                                        )
                                    }
                                >
                                    <Text
                                        style={
                                            styles.btnText
                                        }
                                    >
                                        GitHub
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                /* Footer */
                ListFooterComponent={
                    <View
                        style={[
                            styles.footer,
                            {
                                borderTopColor:
                                    colors.border,
                            },
                        ]}
                    >
                        {/* About */}
                        <View
                            style={
                                styles.footerSection
                            }
                        >
                            <Text
                                style={[
                                    styles.footerTitle,
                                    {
                                        color:
                                            colors.text,
                                    },
                                ]}
                            >
                                {about?.name}
                            </Text>

                            <Text
                                style={[
                                    styles.footerText,
                                    {
                                        color:
                                            colors.secondary,
                                    },
                                ]}
                            >
                                Full Stack
                                Developer building
                                modern web and
                                mobile applications
                                with beautiful UI.
                            </Text>
                        </View>

                        {/* Contact */}
                        <View
                            style={
                                styles.footerSection
                            }
                        >
                            <Text
                                style={[
                                    styles.footerTitle,
                                    {
                                        color:
                                            colors.text,
                                    },
                                ]}
                            >
                                Contact Info
                            </Text>

                            <View
                                style={
                                    styles.contactRow
                                }
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={18}
                                    color={
                                        colors.secondary
                                    }
                                />

                                <Text
                                    style={[
                                        styles.contactText,
                                        {
                                            color:
                                                colors.secondary,
                                        },
                                    ]}
                                >
                                    {about?.email}
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.contactRow
                                }
                            >
                                <Ionicons
                                    name="call-outline"
                                    size={18}
                                    color={
                                        colors.secondary
                                    }
                                />

                                <Text
                                    style={[
                                        styles.contactText,
                                        {
                                            color:
                                                colors.secondary,
                                        },
                                    ]}
                                >
                                    {about?.mobile}
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.contactRow
                                }
                            >
                                <Ionicons
                                    name="location-outline"
                                    size={18}
                                    color={
                                        colors.secondary
                                    }
                                />

                                <Text
                                    style={[
                                        styles.contactText,
                                        {
                                            color:
                                                colors.secondary,
                                        },
                                    ]}
                                >
                                    {about?.location},
                                    Maharashtra
                                </Text>
                            </View>
                        </View>

                        {/* Social */}
                        <View
                            style={
                                styles.footerSection
                            }
                        >
                            <Text
                                style={[
                                    styles.footerTitle,
                                    {
                                        color:
                                            colors.text,
                                    },
                                ]}
                            >
                                Follow Me
                            </Text>

                            <View
                                style={
                                    styles.socialRow
                                }
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            "https://github.com/"
                                        )
                                    }
                                >
                                    <Ionicons
                                        name="logo-github"
                                        size={28}
                                        color={
                                            colors.secondary
                                        }
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            "https://linkedin.com/"
                                        )
                                    }
                                >
                                    <Ionicons
                                        name="logo-linkedin"
                                        size={28}
                                        color={
                                            colors.secondary
                                        }
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            `mailto:${about?.email}`
                                        )
                                    }
                                >
                                    <Ionicons
                                        name="mail"
                                        size={28}
                                        color={
                                            colors.secondary
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Bottom */}
                        <View
                            style={
                                styles.bottomFooter
                            }
                        >
                            <Text
                                style={{
                                    color:
                                        colors.secondary,
                                }}
                            >
                                © 2026 Sachin |
                                All Rights
                                Reserved
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>
    );
};

export default ProjectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    listContainer: {
        padding: 16,
    },

    header: {
        marginBottom: 24,
        alignItems: "center",
    },

    heading: {
        fontSize: 32,
        fontWeight: "700",
    },

    subHeading: {
        marginTop: 8,
        fontSize: 15,
        textAlign: "center",
    },

    card: {
        borderRadius: 20,
        marginBottom: 22,
        overflow: "hidden",
        borderWidth: 1,
        elevation: 4,
    },

    image: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },

    cardBody: {
        padding: 18,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },

    desc: {
        fontSize: 15,
        lineHeight: 24,
    },

    buttonRow: {
        flexDirection: "row",
        marginTop: 20,
        gap: 12,
    },

    primaryBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    darkBtn: {
        flex: 1,
        backgroundColor: "#111827",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "700",
    },

    footer: {
        marginTop: 20,
        paddingTop: 25,
        borderTopWidth: 1,
        paddingBottom: 30,
    },

    footerSection: {
        marginBottom: 25,
    },

    footerTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },

    footerText: {
        fontSize: 14,
        lineHeight: 22,
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    contactText: {
        fontSize: 14,
    },

    socialRow: {
        flexDirection: "row",
        gap: 20,
        marginTop: 10,
    },

    bottomFooter: {
        borderTopWidth: 1,
        borderTopColor: "#334155",
        paddingTop: 15,
        alignItems: "center",
    },
});