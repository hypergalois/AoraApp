import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, textStyles }) => {
    return (
        <View className={containerStyles}>
            <Text
                className={`text-white text-center font-psemibold ${textStyles}`}
            >
                {title}
            </Text>
            {subtitle && (
                <Text className="text-secondary text-center font-pregular">
                    {subtitle}
                </Text>
            )}
        </View>
    );
};

export default InfoBox;
