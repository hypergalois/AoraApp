import { useState, useEffect, useContext, createContext } from "react";

import { getCurrentUser } from "../lib/auth";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
