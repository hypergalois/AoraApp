import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";

import { createPost } from "../../lib/content";

import FormField from "../../components/FormField";

import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Create = () => {
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });

    const { user } = useGlobalContext();

    const [isUploading, setIsUploading] = useState(false);

    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type:
                selectType === "image"
                    ? ["image/png", "image/jpg", "image/jpeg"]
                    : ["video/mp4", "video/gif"],
        });

        if (!result.canceled) {
            Alert.alert("Document picked", JSON.stringify(result, null, 2));

            if (selectType === "image") {
                setForm((prev) => ({ ...prev, thumbnail: result.assets[0] }));
            }

            if (selectType === "video") {
                setForm((prev) => ({ ...prev, video: result.assets[0] }));
            }
        } else {
            console.log("Cancelled");
            Alert.alert("Document not picked", JSON.stringify(result, null, 2));
        }
    };

    const submit = async () => {
        Alert.alert("Form Data", JSON.stringify(form, null, 2));

        if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
            return Alert.alert("Error", "All fields are required");
        }

        setIsUploading(true);

        try {
            await createPost({ ...form, userId: user.$id });

            Alert.alert("Success", "Post uploaded successfully");
            router.push("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsUploading(false);
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl font-psemibold text-white">
                    Upload Video
                </Text>

                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catchy title"
                    handleChangeText={(text) =>
                        setForm((prev) => ({ ...prev, title: text }))
                    }
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base font-pmedium text-gray-100">
                        Upload Video
                    </Text>
                    <TouchableOpacity onPress={() => openPicker("video")}>
                        {form.video ? (
                            <Video
                                source={{ uri: form.video.uri }}
                                className="w-full h-64 rounded-xl"
                                resizeMode={ResizeMode.COVER}
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 items-center justify-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-7 spacy-y-2">
                    <Text className="text-base font-pmedium text-gray-100">
                        Thumbnail image
                    </Text>
                    <TouchableOpacity onPress={() => openPicker("image")}>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                className="w-full h-64 rounded-xl"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    className="w-5 h-5"
                                />
                                <Text className="text-sm font-pmedium text-gray-100">
                                    Upload Thumbnail
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder="The prompt you used to generate this video"
                    handleChangeText={(text) =>
                        setForm((prev) => ({ ...prev, prompt: text }))
                    }
                    otherStyles="mt-7"
                />

                <CustomButton
                    title={"Submit & Pusblish"}
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isUploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
