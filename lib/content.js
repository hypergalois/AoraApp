import { ID, Query } from "react-native-appwrite";

import { appwriteConfig, accounts, avatars, databases } from "./appwrite";

const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId
        );

        if (!posts) {
            throw new Error("Failed to fetch posts");
        }

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(7))]
        );

        if (!posts) {
            throw new Error("Failed to fetch posts");
        }

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export { getAllPosts, getLatestPosts };
