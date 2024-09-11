import { Alert } from "react-native";
import { useState, useEffect } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            console.log(error);
            Alert.alert("Failed to fetch data", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = async () => {
        fetchData();
    };

    return { data, isLoading, refreshData };
};

export default useAppwrite;
