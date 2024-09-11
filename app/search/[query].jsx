import { View, Text, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

import { searchPosts } from "../../lib/content";
import useAppwrite from "../../lib/useAppwrite";

const Search = () => {
    const { query } = useLocalSearchParams();

    const {
        data: searchResults,
        isLoading,
        refreshData,
    } = useAppwrite(() => searchPosts(query));

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refreshData();
        setIsRefreshing(false);
    };

    useEffect(() => {
        if (query) {
            refreshData();
        }
    }, [query]);

    console.log(searchResults);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 spacy-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Search results
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {query}
                                </Text>
                            </View>
                        </View>
                        <SearchInput initialQuery={query} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found"
                        subtitle={`There are no videos matching the search query "${query}"`}
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

export default Search;
