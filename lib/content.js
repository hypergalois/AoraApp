import { ID, Query } from "react-native-appwrite";

import {
    appwriteConfig,
    accounts,
    avatars,
    databases,
    storage,
} from "./appwrite";

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

const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.search("title", query)]
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

const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.equal("creator", userId)]
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

const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) {
            throw new Error("Failed to upload file");
        }

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

const uploadFile = async (file, type) => {
    if (!file) {
        throw new Error("No file provided");
    }

    const { mimeType, uri, name, size } = file;
    const asset = { type: mimeType, uri, size, name };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        if (!fileUrl) {
            throw new Error("Failed to upload file");
        }

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

const createPost = async (form) => {
    try {
        const { title, prompt, video, thumbnail } = form;

        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(form.video, "video"),
            uploadFile(form.thumbnail, "image"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            ID.unique(),
            {
                title,
                prompt,
                video: videoUrl,
                thumbnail: thumbnailUrl,
                creator: form.userId,
            }
        );

        if (!newPost) {
            throw new Error("Failed to create post");
        }

        return newPost;
    } catch (error) {
        throw new Error(error);
    }
};

export { getAllPosts, getLatestPosts, searchPosts, getUserPosts, createPost };
