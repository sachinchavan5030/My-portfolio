import React from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

import { useGetAboutQuery } from "../redux/apis/about.api";

import { useAddContactMutation } from "../redux/apis/contact.api";

import { CREATE_CONTACT_REQUEST } from "@repo/types";

import Toast from "react-native-toast-message";

// const contactSchema = z.object({
//     name: z.string(),
//     email: z.string(),
//     msg: z.string(),
// }) satisfies z.ZodType<CREATE_CONTACT_REQUEST>;

const Contact = () => {
    const { data } = useGetAboutQuery();

    const [addContact, { isLoading }] =
        useAddContactMutation();

    // const {
    //     control,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    // } = useForm<CREATE_CONTACT_REQUEST>({
    //     resolver: zodResolver(contactSchema),
    // });

    const contactSchema = z.object({
        name: z.string(),
        email: z.string(),
        msg: z.string(),
    }) satisfies z.ZodType<CREATE_CONTACT_REQUEST>

    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(contactSchema)
    })

    const handleContact = async (
        formData: CREATE_CONTACT_REQUEST
    ) => {
        try {
            await addContact(formData).unwrap();

            Toast.show({
                type: "success",
                text1: "Message sent successfully 🚀",
            });

            reset();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Something went wrong",
            });
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.heading}>
                    Contact Me
                </Text>

                <Text style={styles.subHeading}>
                    Let's connect and build something
                    amazing together 🚀
                </Text>
            </View>

            {/* Contact Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Get In Touch
                </Text>

                <View style={styles.infoRow}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color="#64748b"
                    />

                    <Text style={styles.infoText}>
                        {data?.result?.[0]?.email}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons
                        name="call-outline"
                        size={20}
                        color="#64748b"
                    />

                    <Text style={styles.infoText}>
                        {data?.result?.[0]?.mobile}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons
                        name="location-outline"
                        size={20}
                        color="#64748b"
                    />

                    <Text style={styles.infoText}>
                        {data?.result?.[0]?.location}
                    </Text>
                </View>

                {/* Social */}
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.socialTitle}>
                        Follow Me
                    </Text>

                    <View style={styles.socialRow}>
                        <TouchableOpacity>
                            <Ionicons
                                name="logo-github"
                                size={30}
                                color="#475569"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name="logo-linkedin"
                                size={30}
                                color="#475569"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name="mail"
                                size={30}
                                color="#475569"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Send Message
                </Text>

                {/* Name */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Your Name"
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.name && (
                        <Text style={styles.error}>
                            {errors.name.message}
                        </Text>
                    )}
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Your Email"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.email && (
                        <Text style={styles.error}>
                            {errors.email.message}
                        </Text>
                    )}
                </View>

                {/* Message */}
                <View style={styles.inputContainer}>
                    <Controller
                        control={control}
                        name="msg"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder="Your Message"
                                style={[
                                    styles.input,
                                    styles.textArea,
                                ]}
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.msg && (
                        <Text style={styles.error}>
                            {errors.msg.message}
                        </Text>
                    )}
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(handleContact)}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            Send Message
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerName}>
                    {data?.result?.[0]?.name}
                </Text>

                <Text style={styles.footerText}>
                    Full Stack Developer building
                    modern mobile and web applications.
                </Text>

                <View style={styles.footerBottom}>
                    <Text style={styles.copy}>
                        © 2026 Sachin — Built with ❤️
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Contact;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f8fafc",
    },

    header: {
        alignItems: "center",
        marginBottom: 20,
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
        fontSize: 15,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        color: "#0f172a",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
    },

    infoText: {
        fontSize: 15,
        color: "#475569",
    },

    socialTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#0f172a",
    },

    socialRow: {
        flexDirection: "row",
        gap: 20,
    },

    inputContainer: {
        marginBottom: 18,
    },

    input: {
        backgroundColor: "#f1f5f9",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 15,
        color: "#0f172a",
    },

    textArea: {
        height: 140,
    },

    error: {
        color: "red",
        marginTop: 6,
        fontSize: 13,
    },

    button: {
        backgroundColor: "#0f172a",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    footer: {
        marginTop: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        alignItems: "center",
        paddingBottom: 20,
    },

    footerName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
    },

    footerText: {
        marginTop: 10,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22,
    },

    footerBottom: {
        marginTop: 20,
    },

    copy: {
        color: "#94a3b8",
    },
});