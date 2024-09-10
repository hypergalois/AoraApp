import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

import { icons } from "../constants/";

const VideoCard = ({
    video: {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
    },
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <View className="flex-col items-center mb-14 px-4">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            numberOfLines={1}
                            className="text-white text-sm font-psemibold"
                        >
                            {title}
                        </Text>
                        <Text
                            numberOfLines={1}
                            className="text-gray-100 text-xs font-pregular"
                        >
                            {username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode="contain"
                    />
                </View>
            </View>
            {isPlaying ? (
                <Text className="text-white"> playing</Text>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-60 rounded-xl overflow-hiden relative justify-center items-center mt-3"
                    onPress={() => setIsPlaying(true)}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
