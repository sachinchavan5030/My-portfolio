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

import { useGetAboutQuery } from "../redux/apis/about.api";
import { useGetProjectQuery } from "../redux/apis/project.api";
import { useGetExprienceQuery } from "../redux/apis/exprience.api";

const HomeScreen = () => {
    const { data } = useGetAboutQuery();
    console.log(data)
    const { data: projectData } = useGetProjectQuery();
    const { data: exprienceData } = useGetExprienceQuery();

    const theme = useColorScheme();
    const dark = theme === "dark";

    const user = data?.result?.[0];
    const exprience =
        exprienceData?.result?.[0];

    const bg = dark ? "#121212" : "#ffffff";
    const text = dark ? "#ffffff" : "#000000";
    const card = dark ? "#1f1f1f" : "#f5f5f5";
    const border = dark ? "#2d2d2d" : "#e5e7eb";
    const secondary = dark
        ? "#94a3b8"
        : "#64748b";

    const skills = [
        "React.js",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Tailwind CSS",
        "Redux",
        "MongoDB",
        "GraphQL",
    ];

    const stats = [
        {
            icon: "trophy-outline",
            label: "Experience",
            value:
                exprience?.exprienceYear ||
                0,
        },
        {
            icon: "code-slash-outline",
            label: "Projects",
            value:
                exprience?.projects || 0,
        },
        {
            icon: "briefcase-outline",
            label: "Technologies",
            value:
                exprience?.technologies ||
                0,
        },
        {
            icon: "people-outline",
            label: "Clients",
            value:
                exprience?.happyClient ||
                0,
        },
    ];

    const renderProject = ({
        item,
    }: any) => (
        <View
            style={[
                styles.projectCard,
                {
                    backgroundColor: card,
                    borderColor: border,
                },
            ]}
        >
            <Image
                source={{
                    uri: item.projectImage,
                }}
                style={styles.projectImage}
            />

            <Text
                style={[
                    styles.projectTitle,
                    { color: text },
                ]}
            >
                {item.title}
            </Text>

            <Text
                style={[
                    styles.projectDesc,
                    { color: secondary },
                ]}
                numberOfLines={3}
            >
                {item.desc}
            </Text>

            <View style={styles.techRow}>
                {item.technologies
                    ?.slice(0, 3)
                    .map(
                        (
                            tech: string,
                            i: number
                        ) => (
                            <View
                                key={i}
                                style={[
                                    styles.techBadge,
                                    {
                                        backgroundColor:
                                            dark
                                                ? "#2a2a2a"
                                                : "#e5e7eb",
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color:
                                            text,
                                        fontSize: 12,
                                    }}
                                >
                                    {tech}
                                </Text>
                            </View>
                        )
                    )}
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.smallBtn}
                    onPress={() =>
                        Linking.openURL(
                            item.liveLink
                        )
                    }
                >
                    <Ionicons
                        name="open-outline"
                        size={16}
                        color="#fff"
                    />

                    <Text style={styles.btnText}>
                        Live
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.smallBtn}
                    onPress={() =>
                        Linking.openURL(
                            item.githubLink
                        )
                    }
                >
                    <Ionicons
                        name="logo-github"
                        size={16}
                        color="#fff"
                    />

                    <Text style={styles.btnText}>
                        Code
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={
                false
            }
            style={{
                backgroundColor: bg,
            }}
            data={
                projectData?.result || []
            }
            keyExtractor={(item, index) =>
                item?.id?.toString() ||
                item?.id?.toString() ||
                index.toString()
            }
            renderItem={renderProject}
            ListHeaderComponent={
                <>
                    {/* Hero Section */}
                    <View
                        style={[
                            styles.heroSection,
                        ]}
                    >
                        <Image
                            source={{
                                uri:
                                    user?.profilePic ||
                                    "https://via.placeholder.com/300",
                            }}
                            style={styles.profileImage}
                        />

                        <Text
                            style={[
                                styles.title,
                                {
                                    color: text,
                                },
                            ]}
                        >
                            Hi, I'm{" "}
                            {
                                user?.name?.split(
                                    " "
                                )[0]
                            }
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    color:
                                        secondary,
                                },
                            ]}
                        >
                            Full Stack Developer
                        </Text>

                        <Text
                            style={[
                                styles.heroText,
                                {
                                    color:
                                        secondary,
                                },
                            ]}
                        >
                            Building clean,
                            responsive and
                            user-friendly web
                            applications with
                            modern technologies.
                        </Text>

                        <View
                            style={
                                styles.heroBtnRow
                            }
                        >
                            <TouchableOpacity
                                style={
                                    styles.btn
                                }
                                onPress={() =>
                                    Linking.openURL(
                                        exprience?.resume as string
                                    )
                                }
                            >
                                <Ionicons
                                    name="download-outline"
                                    size={
                                        18
                                    }
                                    color="#fff"
                                />

                                <Text
                                    style={
                                        styles.btnText
                                    }
                                >
                                    Download CV
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.outlineBtn,
                                    {
                                        borderColor:
                                            border,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color:
                                            text,
                                        fontWeight:
                                            "600",
                                    }}
                                >
                                    Contact
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={
                                styles.socialRow
                            }
                        >
                            <TouchableOpacity>
                                <Ionicons
                                    name="logo-github"
                                    size={
                                        26
                                    }
                                    color={
                                        secondary
                                    }
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons
                                    name="logo-linkedin"
                                    size={
                                        26
                                    }
                                    color={
                                        secondary
                                    }
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(
                                        `mailto:${user?.email}`
                                    )
                                }
                            >
                                <Ionicons
                                    name="mail-outline"
                                    size={
                                        26
                                    }
                                    color={
                                        secondary
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* About */}
                    <View
                        style={
                            styles.section
                        }
                    >
                        <Text
                            style={[
                                styles.heading,
                                {
                                    color: text,
                                },
                            ]}
                        >
                            About Me
                        </Text>

                        <Text
                            style={[
                                styles.aboutText,
                                {
                                    color:
                                        secondary,
                                },
                            ]}
                        >
                            {user?.bio}
                        </Text>

                        <View
                            style={
                                styles.checkBox
                            }
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#22c55e"
                            />

                            <Text
                                style={[
                                    styles.checkText,
                                    {
                                        color:
                                            text,
                                    },
                                ]}
                            >
                                5+ years of
                                professional
                                experience
                            </Text>
                        </View>

                        <View
                            style={
                                styles.checkBox
                            }
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#22c55e"
                            />

                            <Text
                                style={[
                                    styles.checkText,
                                    {
                                        color:
                                            text,
                                    },
                                ]}
                            >
                                20+ projects
                                delivered
                                successfully
                            </Text>
                        </View>

                        <View
                            style={
                                styles.checkBox
                            }
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color="#22c55e"
                            />

                            <Text
                                style={[
                                    styles.checkText,
                                    {
                                        color:
                                            text,
                                    },
                                ]}
                            >
                                React, Next.js &
                                Node.js expert
                            </Text>
                        </View>
                    </View>

                    {/* Stats */}
                    <View
                        style={
                            styles.section
                        }
                    >
                        <FlatList
                            data={stats}
                            numColumns={2}
                            scrollEnabled={
                                false
                            }
                            keyExtractor={(
                                _,
                                i
                            ) =>
                                i.toString()
                            }
                            renderItem={({
                                item,
                            }) => (
                                <View
                                    style={[
                                        styles.card,
                                        {
                                            backgroundColor:
                                                card,
                                            borderColor:
                                                border,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={
                                            item.icon as any
                                        }
                                        size={
                                            30
                                        }
                                        color={
                                            secondary
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.cardNumber,
                                            {
                                                color:
                                                    text,
                                            },
                                        ]}
                                    >
                                        {
                                            item.value
                                        }
                                        +
                                    </Text>

                                    <Text
                                        style={{
                                            color:
                                                secondary,
                                        }}
                                    >
                                        {
                                            item.label
                                        }
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    {/* Skills */}
                    <View
                        style={
                            styles.section
                        }
                    >
                        <Text
                            style={[
                                styles.heading,
                                {
                                    color: text,
                                },
                            ]}
                        >
                            Skills
                        </Text>

                        <View
                            style={
                                styles.skillsContainer
                            }
                        >
                            {skills.map(
                                (
                                    skill,
                                    i
                                ) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.skillBox,
                                            {
                                                backgroundColor:
                                                    card,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    text,
                                            }}
                                        >
                                            {
                                                skill
                                            }
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>

                    {/* Projects Heading */}
                    <View
                        style={
                            styles.section
                        }
                    >
                        <Text
                            style={[
                                styles.heading,
                                {
                                    color: text,
                                },
                            ]}
                        >
                            Projects
                        </Text>

                        <Text
                            style={{
                                color:
                                    secondary,
                            }}
                        >
                            Some of my recent
                            work
                        </Text>
                    </View>
                </>
            }
            ListFooterComponent={
                <View
                    style={[
                        styles.footer,
                        {
                            borderTopColor:
                                border,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.footerName,
                            { color: text },
                        ]}
                    >
                        {user?.name}
                    </Text>

                    <Text
                        style={[
                            styles.footerDesc,
                            {
                                color:
                                    secondary,
                            },
                        ]}
                    >
                        Full Stack Developer
                    </Text>

                    <View
                        style={
                            styles.contactRow
                        }
                    >
                        <Ionicons
                            name="mail-outline"
                            size={18}
                            color={secondary}
                        />

                        <Text
                            style={{
                                color:
                                    secondary,
                            }}
                        >
                            {user?.email}
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
                            color={secondary}
                        />

                        <Text
                            style={{
                                color:
                                    secondary,
                            }}
                        >
                            {user?.mobile}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.copy,
                            {
                                color:
                                    secondary,
                            },
                        ]}
                    >
                        © 2026 {user?.name} |
                        All Rights Reserved
                    </Text>
                </View>
            }
        />
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    heroSection: {
        padding: 24,
        alignItems: "center",
        paddingTop: 50,
    },

    section: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },

    profileImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
        marginBottom: 20,
    },

    title: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 18,
        marginTop: 8,
    },

    heroText: {
        textAlign: "center",
        marginTop: 15,
        lineHeight: 24,
        fontSize: 15,
        paddingHorizontal: 10,
    },

    heroBtnRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24,
    },

    btn: {
        backgroundColor: "#111827",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    outlineBtn: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "600",
    },

    socialRow: {
        flexDirection: "row",
        gap: 20,
        marginTop: 24,
    },

    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
    },

    aboutText: {
        lineHeight: 24,
        fontSize: 15,
    },

    checkBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
    },

    checkText: {
        fontSize: 15,
    },

    card: {
        flex: 1,
        margin: 8,
        padding: 22,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
    },

    cardNumber: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 10,
    },

    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    skillBox: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        margin: 6,
    },

    projectCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        paddingBottom: 16,
    },

    projectImage: {
        width: "100%",
        height: 200,
    },

    projectTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 14,
        marginHorizontal: 14,
    },

    projectDesc: {
        marginTop: 8,
        marginHorizontal: 14,
        lineHeight: 22,
    },

    techRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        marginHorizontal: 14,
    },

    techBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },

    row: {
        flexDirection: "row",
        marginTop: 15,
        marginHorizontal: 14,
    },

    smallBtn: {
        backgroundColor: "#111827",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    footer: {
        padding: 25,
        borderTopWidth: 1,
        marginTop: 20,
        alignItems: "center",
    },

    footerName: {
        fontSize: 22,
        fontWeight: "bold",
    },

    footerDesc: {
        marginTop: 5,
        marginBottom: 20,
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },

    copy: {
        marginTop: 20,
        fontSize: 13,
    },
});