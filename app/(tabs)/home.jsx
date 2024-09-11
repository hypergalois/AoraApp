import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
    Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

import { getAllPosts, getLatestPosts } from "../../lib/content";
import useAppwrite from "../../lib/useAppwrite";

import { images } from "../../constants/";

const Home = () => {
    const { data: posts, isLoading, refreshData } = useAppwrite(getAllPosts);
    const { data: latestPosts, isLoading: isLatestLoading } =
        useAppwrite(getLatestPosts);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const { user } = useGlobalContext();

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refreshData();
        setIsRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 spacy-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome back
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {user?.username}
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
                        <SearchInput placeholder={"Search for a video topic"} />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg text-gray-100 font-pregular mb-3">
                                Trending videos
                            </Text>

                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle="Be the first to upload a video"
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

export default Home;
