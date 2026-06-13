import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Linking,
    useColorScheme,
} from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'

import { useGetSkillQuery } from '../redux/apis/skill.api'
import { useGetAboutQuery } from '../redux/apis/about.api'

const SkillScreen = () => {
    const { data } = useGetSkillQuery()
    const { data: aboutData } = useGetAboutQuery()

    const theme = useColorScheme()

    const isDark = theme === 'dark'

    const colors = {
        background: isDark ? '#0f172a' : '#f8fafc',
        card: isDark ? '#1e293b' : '#ffffff',
        text: isDark ? '#ffffff' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#64748b',
        border: isDark ? '#334155' : '#e2e8f0',
    }

    const about = aboutData?.result?.[0]

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <FlatList
                data={data?.result || []}
                keyExtractor={(item, index) =>
                    item.id?.toString() || index.toString()
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}

                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.title,
                                { color: colors.text },
                            ]}
                        >
                            My Skills 🚀
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    color: colors.secondary,
                                },
                            ]}
                        >
                            Technologies and tools I use
                        </Text>
                    </View>
                }

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
                        <Text
                            style={[
                                styles.cardText,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {item.skills}
                        </Text>

                        <View style={styles.badge}>
                            <Text
                                style={
                                    styles.badgeText
                                }
                            >
                                Technology
                            </Text>
                        </View>
                    </View>
                )}

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
                            style={styles.footerSection}
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
                                Full Stack Developer
                                passionate about
                                building scalable and
                                modern web
                                applications.
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
                            style={styles.footerSection}
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
                                            'https://github.com/'
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
                                            'https://linkedin.com/'
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

                        {/* Bottom Footer */}
                        <View
                            style={[
                                styles.bottomFooter,
                                {
                                    borderTopColor:
                                        colors.border,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color:
                                        colors.secondary,
                                }}
                            >
                                © 2026 Sachin | All
                                Rights Reserved
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

export default SkillScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
    },

    subtitle: {
        marginTop: 6,
        fontSize: 15,
    },

    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 30,
    },

    card: {
        width: '48%',
        borderRadius: 18,
        paddingVertical: 28,
        paddingHorizontal: 12,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        elevation: 3,
    },

    cardText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },

    badge: {
        marginTop: 12,
        backgroundColor: '#2563eb',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    footer: {
        marginTop: 25,
        paddingTop: 25,
        borderTopWidth: 1,
    },

    footerSection: {
        marginBottom: 25,
    },

    footerTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },

    footerText: {
        fontSize: 14,
        lineHeight: 22,
    },

    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },

    contactText: {
        fontSize: 14,
    },

    socialRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
    },

    bottomFooter: {
        borderTopWidth: 1,
        paddingTop: 15,
        alignItems: 'center',
    },
})