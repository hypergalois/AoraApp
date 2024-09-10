import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

import { createUser } from "../../lib/auth";

import { images } from "../../constants";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submitForm = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Eror!", "Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createUser(form);

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
                        Sign up
                    </Text>

                    <FormField
                        title="Username"
                        placeholder="Enter your username"
                        value={form.username}
                        handleChangeText={(e) =>
                            setForm({ ...form, username: e })
                        }
                        otherStyles="mt-7"
                    />

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
                    />

                    <CustomButton
                        title="Sign Up"
                        containerStyles="w-full mt-7"
                        handlePress={submitForm}
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-gray-100 text-lg font-pregular">
                            Already have an account?
                        </Text>
                        <Link
                            href="/sign-in"
                            className="text-secondary text-lg font-psemibold"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
