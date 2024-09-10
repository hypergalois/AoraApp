import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    keyboardType,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full bg-black-100 border-2 border-black-200 h-16 rounded-2xl px-4 focus:border-secondary items-center flex-row space-x-4">
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#7B7B8B"}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                {...props}
                secureTextEntry={title === "Password" && !showPassword}
                className="flex-1 text-base mt-0.5 font-pregular text-white"
            />

            <TouchableOpacity>
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
