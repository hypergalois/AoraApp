import {
    Client,
    Account,
    Avatars,
    Databases,
    Storage,
} from "react-native-appwrite";

import {
    APPWRITE_ENDPOINT,
    APPWRITE_PLATFORM,
    APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    APPWRITE_VIDEOS_COLLECTION_ID,
    APPWRITE_STORAGE_ID,
} from "@env";

export const appwriteConfig = {
    endpoint: APPWRITE_ENDPOINT,
    platform: APPWRITE_PLATFORM,
    projectId: APPWRITE_PROJECT_ID,
    databaseId: APPWRITE_DATABASE_ID,
    usersCollectionId: APPWRITE_USERS_COLLECTION_ID,
    videosCollectionId: APPWRITE_VIDEOS_COLLECTION_ID,
    storageId: APPWRITE_STORAGE_ID,
};

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setPlatform(APPWRITE_PLATFORM);

const accounts = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { accounts, avatars, databases, storage };
