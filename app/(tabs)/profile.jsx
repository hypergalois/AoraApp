import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Image,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";

import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";

import { getUserPosts } from "../../lib/content";
import { signOut } from "../../lib/auth";
import useAppwrite from "../../lib/useAppwrite";

import { icons } from "../../constants";

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const {
        data: userPosts,
        isLoading,
        refreshData,
    } = useAppwrite(() => getUserPosts(user.$id));

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refreshData();
        setIsRefreshing(false);
    };

    const logout = async () => {
        await signOut();

        setUser(null);
        setIsLoggedIn(false);

        router.replace("/");
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={userPosts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            onPress={logout}
                            className="w-full items-end mb-10"
                        >
                            <Image
                                source={icons.logout}
                                className="W-6 h-6"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="w-[95%] h-[95%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-5"
                            textStyles="text-lg"
                        />

                        <View className="mt-5 flex-row">
                            <InfoBox
                                title={userPosts.length || 0}
                                subtitle="Posts"
                                containerStyles="mr-10"
                                textStyles="text-xl"
                            />

                            <InfoBox
                                title="3.5k"
                                subtitle="Followers"
                                textStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle="You haven't uploaded any videos yet"
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Profile;
