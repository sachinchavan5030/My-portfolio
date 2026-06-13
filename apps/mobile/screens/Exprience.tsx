import React from "react";

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Linking,
    useColorScheme,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useGetExprienceQuery } from "../redux/apis/exprience.api";
import { useGetAboutQuery } from "../redux/apis/about.api";

const ExperienceScreen = () => {
    const { data } = useGetExprienceQuery();

    const { data: aboutData } =
        useGetAboutQuery();

    const theme = useColorScheme();

    const isDark = theme === "dark";

    const about = aboutData?.result?.[0];

    const experiences = data?.result || [];

    return (
        <FlatList
            data={experiences}
            keyExtractor={(item: any) =>
                item._id.toString()
            }
            showsVerticalScrollIndicator={
                false
            }
            contentContainerStyle={[
                styles.container,
                {
                    backgroundColor: isDark
                        ? "#0f172a"
                        : "#f8fafc",
                },
            ]}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.heading,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#0f172a",
                            },
                        ]}
                    >
                        Experience 💼
                    </Text>

                    <Text
                        style={[
                            styles.subHeading,
                            {
                                color: isDark
                                    ? "#94a3b8"
                                    : "#64748b",
                            },
                        ]}
                    >
                        My professional journey
                        and the roles I’ve worked
                        in so far.
                    </Text>
                </View>
            }
            renderItem={({ item, index }) => (
                <View
                    style={
                        styles.timelineWrapper
                    }
                >
                    {/* Timeline Line */}
                    {index !==
                        experiences.length -
                        1 && (
                            <View
                                style={[
                                    styles.line,
                                    {
                                        backgroundColor:
                                            isDark
                                                ? "#334155"
                                                : "#cbd5e1",
                                    },
                                ]}
                            />
                        )}

                    {/* Dot */}
                    <View style={styles.dot} />

                    {/* Card */}
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor:
                                    isDark
                                        ? "#1e293b"
                                        : "#fff",
                            },
                        ]}
                    >
                        {/* Header */}
                        <View
                            style={
                                styles.cardHeader
                            }
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.role,
                                        {
                                            color:
                                                isDark
                                                    ? "#fff"
                                                    : "#111827",
                                        },
                                    ]}
                                >
                                    {item.role}
                                </Text>

                                <Text
                                    style={
                                        styles.company
                                    }
                                >
                                    {
                                        item.companyName
                                    }
                                </Text>
                            </View>

                            {/* Badge */}
                            <View
                                style={
                                    styles.badge
                                }
                            >
                                <Text
                                    style={
                                        styles.badgeText
                                    }
                                >
                                    {/* {item.workingDate} */}
                                </Text>
                            </View>
                        </View>

                        {/* Description */}
                        <Text
                            style={[
                                styles.desc,
                                {
                                    color: isDark
                                        ? "#cbd5e1"
                                        : "#475569",
                                },
                            ]}
                        >
                            {item.eDesc}
                        </Text>
                    </View>
                </View>
            )}
            ListFooterComponent={
                <View style={styles.footer}>
                    {/* About */}
                    <View
                        style={styles.footerSection}
                    >
                        <Text
                            style={[
                                styles.footerTitle,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111827",
                                },
                            ]}
                        >
                            {about?.name}
                        </Text>

                        <Text
                            style={
                                styles.footerText
                            }
                        >
                            Full Stack Developer
                            passionate about
                            building scalable and
                            modern applications.
                        </Text>
                    </View>

                    {/* Contact */}
                    <View
                        style={styles.footerSection}
                    >
                        <Text
                            style={[
                                styles.footerTitle,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111827",
                                },
                            ]}
                        >
                            Contact
                        </Text>

                        <View
                            style={
                                styles.contactRow
                            }
                        >
                            <Ionicons
                                name="mail-outline"
                                size={18}
                                color="#64748b"
                            />

                            <Text
                                style={
                                    styles.contactText
                                }
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
                                color="#64748b"
                            />

                            <Text
                                style={
                                    styles.contactText
                                }
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
                                color="#64748b"
                            />

                            <Text
                                style={
                                    styles.contactText
                                }
                            >
                                {about?.location},
                                Maharashtra
                            </Text>
                        </View>
                    </View>

                    {/* Social */}
                    <View
                        style={styles.footerSection}
                    >
                        <Text
                            style={[
                                styles.footerTitle,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111827",
                                },
                            ]}
                        >
                            Follow Me
                        </Text>

                        <View
                            style={styles.socialRow}
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
                                    color="#64748b"
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
                                    color="#64748b"
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
                                    color="#64748b"
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
                        <Text style={styles.copy}>
                            © 2026 Sachin —
                            Built with ❤️
                        </Text>
                    </View>
                </View>
            }
        />
    );
};

export default ExperienceScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    header: {
        marginBottom: 30,
        alignItems: "center",
    },

    heading: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 10,
    },

    subHeading: {
        textAlign: "center",
        lineHeight: 24,
        fontSize: 15,
    },

    timelineWrapper: {
        position: "relative",
        paddingLeft: 30,
        marginBottom: 25,
    },

    line: {
        position: "absolute",
        left: 10,
        top: 20,
        width: 2,
        height: "100%",
    },

    dot: {
        position: "absolute",
        left: 2,
        top: 12,
        width: 18,
        height: 18,
        borderRadius: 20,
        backgroundColor: "#3b82f6",
    },

    card: {
        borderRadius: 20,
        padding: 18,
        elevation: 4,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14,
        gap: 10,
    },

    role: {
        fontSize: 19,
        fontWeight: "700",
    },

    company: {
        marginTop: 4,
        color: "#64748b",
        fontSize: 14,
    },

    badge: {
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#334155",
    },

    desc: {
        fontSize: 15,
        lineHeight: 24,
    },

    footer: {
        marginTop: 20,
        paddingTop: 25,
        borderTopWidth: 1,
        borderTopColor: "#334155",
        paddingBottom: 20,
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
        color: "#64748b",
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
    },

    contactText: {
        fontSize: 14,
        color: "#64748b",
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

    copy: {
        color: "#64748b",
    },
});