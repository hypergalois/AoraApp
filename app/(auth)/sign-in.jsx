import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router, Link } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { getCurrentUser, signIn } from "../../lib/auth";

import { images } from "../../constants";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submitForm = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error!", "Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();

            setUser(result);
            setIsLoggedIn(true);

            router.replace("/home");
        } catch (error) {
            Alert.alert("Error!", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />

                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Sign in
                    </Text>

                    <FormField
                        title="Email"
                        placeholder="Enter your email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        placeholder="Enter your password"
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                        keyboardType="password"
                    />

                    <CustomButton
                        title="Sign In"
                        containerStyles="w-full mt-7"
                        handlePress={submitForm}
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-gray-100 text-lg font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-secondary text-lg font-psemibold"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
