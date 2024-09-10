import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";

import SearchInput from "../../components/SearchInput";

import { images } from "../../constants/";

const Home = () => {
    const { user } = useGlobalContext();

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                key={"$id"}
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className="text-3xl">{item.id}</Text>
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 spacy-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome back
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {user.documents[0].username}
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    className="w-9 h-10"
                                    source={images.logoSmall}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchInput />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Home;
