import { ID, Query } from "react-native-appwrite";

import { appwriteConfig, accounts, avatars, databases } from "./appwrite";

const createUser = async ({ email, password, username }) => {
    try {
        const newAccount = await accounts.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) {
            throw new Error("Failed to create user");
        }

        const avatarUrl = avatars.getInitials(newAccount.name);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: newAccount.email,
                username: newAccount.name,
                avatar: avatarUrl,
            }
        );

        if (!newUser) {
            throw new Error("Failed to create user");
        }

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const signIn = async (email, password) => {
    try {
        deleteSession();

        const session = await accounts.createEmailPasswordSession(
            email,
            password
        );

        if (!session) {
            throw new Error("Failed to sign in");
        }

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const deleteSession = async () => {
    try {
        const activeSessions = await accounts.listSessions();
        if (activeSessions.total > 0) {
            await accounts.deleteSession("current");
        }
    } catch (error) {
        console.log(error);
    }
};

const getCurrentUser = async () => {
    try {
        const currentAccount = await accounts.get();

        if (!currentAccount) {
            throw new Error("Failed to get user");
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) {
            throw new Error("Failed to get user");
        }

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const signOut = async () => {
    try {
        const session = await deleteSession("current");

        if (!session) {
            throw new Error("Failed to sign out");
        }

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export { createUser, signIn, getCurrentUser, signOut };
