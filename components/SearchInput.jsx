import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";

import { icons } from "../constants";

const SearchInput = ({ placeholder, initialQuery, ...props }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="w-full bg-black-100 border-2 border-black-200 h-16 rounded-2xl px-4 focus:border-secondary items-center flex-row space-x-4">
            <TextInput
                value={query}
                placeholder={placeholder}
                placeholderTextColor={"#CDCDE0"}
                onChangeText={setQuery}
                {...props}
                className="flex-1 text-base mt-0.5 font-pregular text-white"
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert(
                            "No search query provided",
                            "Please enter a search query"
                        );
                    }

                    if (pathname.startsWith("/search")) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }}
            >
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    className="w-5 h-5"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
