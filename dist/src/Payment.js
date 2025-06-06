import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
export const Payment = ({ collectId, onSuccess, onFailure, mode, }) => {
    const [webViewUrl, setWebviewUrl] = useState("");
    if (mode !== "production" && mode !== "sandbox") {
        return (React.createElement(View, { style: styles.errorcontainer },
            React.createElement(Text, { style: styles.errorText }, "Invalid Payment Mode")));
    }
    if (typeof onSuccess !== "function") {
        return (React.createElement(View, { style: styles.errorcontainer },
            React.createElement(Text, { style: styles.errorText }, "onSuccess is not a function")));
    }
    if (typeof onFailure !== "function") {
        return (React.createElement(View, { style: styles.errorcontainer },
            React.createElement(Text, { style: styles.errorText }, "onFailure is not a function")));
    }
    useEffect(() => {
        if ((webViewUrl.includes("https://dev.pg.edviron.com/payment-success") ||
            webViewUrl.includes("https://pg.edviron.com/payment-success")) &&
            webViewUrl.includes(collectId)) {
            onSuccess();
        }
        else if ((webViewUrl.includes("https://dev.pg.edviron.com/payment-failure") ||
            webViewUrl.includes("https://pg.edviron.com/payment-failure")) &&
            webViewUrl.includes(collectId)) {
            onFailure();
        }
    }, [webViewUrl]);
    const handleNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        setWebviewUrl(url);
    };
    const url = mode === "production"
        ? `https://pg.edviron.com`
        : `https://dev.pg.edviron.com`;
    return (React.createElement(View, { style: styles.container },
        React.createElement(WebView, { source: { uri: `${url}/collect-sdk-payments?collect_id=${collectId}` }, style: styles.webview, onNavigationStateChange: handleNavigationStateChange })));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    errorcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
    },
    errorText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "red",
    },
    retryButton: {
        backgroundColor: "blue",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
