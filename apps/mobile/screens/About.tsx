import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useGetAboutQuery } from "../redux/apis/about.api";

const About = () => {
    const { data } = useGetAboutQuery();

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>

            {/* Profile */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: item.profilePic }}
                    style={styles.profileImage}
                />

                <Text style={styles.name}>
                    {item.name}
                </Text>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        Full Stack Developer
                    </Text>
                </View>
            </View>

            {/* Bio */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Bio
                </Text>

                <Text style={styles.text}>
                    {item.bio}
                </Text>
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Education
                </Text>

                <View style={styles.eduCard}>
                    <Text style={styles.eduTitle}>
                        Bachelor of Computer Applications (BCA)
                    </Text>

                    <Text style={styles.eduText}>
                        Dr. Babasaheb Ambedkar Marathwada University,
                        Chhatrapati Sambhajinagar
                    </Text>
                </View>
            </View>

            {/* Personal Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Personal Information
                </Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{item.name}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{item.email}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Mobile:</Text>
                    <Text style={styles.value}>{item.mobile}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>DOB:</Text>
                    <Text style={styles.value}>{item.dob}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{item.location}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data?.result || []}
            keyExtractor={(item: any) => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}

            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.heading}>
                        About Me 👨‍💻
                    </Text>

                    <Text style={styles.subHeading}>
                        Get to know more about me, my education,
                        and personal details.
                    </Text>
                </View>
            }

            ListFooterComponent={
                <View style={styles.footer}>

                    {/* About */}
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>
                            {data?.result?.[0]?.name}
                        </Text>

                        <Text style={styles.footerText}>
                            Full Stack Developer passionate about
                            building scalable and modern web applications.
                        </Text>
                    </View>

                    {/* Contact */}
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>
                            Contact
                        </Text>

                        <View style={styles.contactRow}>
                            <Ionicons
                                name="mail-outline"
                                size={18}
                                color="#64748b"
                            />

                            <Text style={styles.contactText}>
                                {data?.result?.[0]?.email}
                            </Text>
                        </View>

                        <View style={styles.contactRow}>
                            <Ionicons
                                name="call-outline"
                                size={18}
                                color="#64748b"
                            />

                            <Text style={styles.contactText}>
                                {data?.result?.[0]?.mobile}
                            </Text>
                        </View>

                        <View style={styles.contactRow}>
                            <Ionicons
                                name="location-outline"
                                size={18}
                                color="#64748b"
                            />

                            <Text style={styles.contactText}>
                                {data?.result?.[0]?.location}, Maharashtra
                            </Text>
                        </View>
                    </View>

                    {/* Social */}
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>
                            Social
                        </Text>

                        <View style={styles.socialRow}>
                            <TouchableOpacity>
                                <Ionicons
                                    name="logo-github"
                                    size={28}
                                    color="#64748b"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons
                                    name="logo-linkedin"
                                    size={28}
                                    color="#64748b"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons
                                    name="mail"
                                    size={28}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom */}
                    <View style={styles.bottomFooter}>
                        <Text style={styles.copy}>
                            © 2026 Sachin — Built with ❤️
                        </Text>
                    </View>
                </View>
            }
        />
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f8fafc",
    },

    header: {
        marginBottom: 20,
        alignItems: "center",
    },

    heading: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#0f172a",
    },

    subHeading: {
        marginTop: 10,
        textAlign: "center",
        color: "#64748b",
        lineHeight: 22,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
    },

    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 15,
        color: "#0f172a",
    },

    badge: {
        marginTop: 10,
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 30,
    },

    badgeText: {
        color: "#334155",
        fontWeight: "600",
    },

    section: {
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 12,
        color: "#0f172a",
    },

    text: {
        fontSize: 16,
        color: "#475569",
        lineHeight: 26,
    },

    eduCard: {
        backgroundColor: "#f1f5f9",
        padding: 15,
        borderRadius: 14,
    },

    eduTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 6,
    },

    eduText: {
        color: "#64748b",
        lineHeight: 22,
    },

    infoRow: {
        flexDirection: "row",
        marginBottom: 10,
    },

    label: {
        width: 90,
        fontWeight: "700",
        color: "#0f172a",
    },

    value: {
        flex: 1,
        color: "#475569",
    },

    footer: {
        marginTop: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
    },

    footerSection: {
        marginBottom: 25,
    },

    footerTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        color: "#0f172a",
    },

    footerText: {
        color: "#64748b",
        lineHeight: 22,
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 8,
    },

    contactText: {
        color: "#64748b",
    },

    socialRow: {
        flexDirection: "row",
        gap: 20,
    },

    bottomFooter: {
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 15,
        alignItems: "center",
    },

    copy: {
        color: "#64748b",
    },
});