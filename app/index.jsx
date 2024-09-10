import { View, ScrollView, Image, Text } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import { useGlobalContext } from "../context/GlobalProvider";

import CustomButton from "../components/CustomButton";

import { images } from "../constants";

export default function App() {
    const { isLoggedIn, isLoading } = useGlobalContext();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            router.replace("/home");
        }
    }, [isLoading, isLoggedIn]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full h-full justify-center items-center px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-4xl text-white font-bold text-center">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-lg font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey
                        of Limitless Exploration with Aora
                    </Text>

                    <CustomButton
                        title="Get Started"
                        containerStyles="w-full mt-7"
                        handlePress={() => {
                            router.push("/sign-in");
                        }}
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}
