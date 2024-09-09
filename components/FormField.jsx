import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import { icons } from "../constants";

const FormField = ({
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
        <View className={`spacy-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="w-full bg-black-100 border-2 border-black-200 h-16 rounded-2xl px-4 focus:border-secondary items-center flex-row">
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7B7B8B"}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    {...props}
                    secureTextEntry={title === "Password" && !showPassword}
                    className="flex-1 text-white font-psemibold"
                />

                {title === "Password" && (
                    <TouchableOpacity
                        onPress={() => {
                            setShowPassword((prev) => !prev);
                        }}
                    >
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
