export const formatSessionData = (user, sessionData) => {
    const sessionDataToUse = sessionData && typeof sessionData === "object" ? sessionData : {};
    return {
        user,
        ...sessionDataToUse,
        start: Date.now(),
        loggedIn: true
    };
};

export const automaticLoginData = () => formatSessionData({ name: "Nate" });