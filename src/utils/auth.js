export const getRole = () => {
    const token = sessionStorage.getItem("token");
    if(!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        return (
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
            payload.role
        );
    } catch {
        return null;
    }
};