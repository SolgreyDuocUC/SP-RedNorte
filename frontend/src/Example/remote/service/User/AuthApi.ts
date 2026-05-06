const api = "http://localhost:8050/api/v1";

    export const loginAPI = async (email: string, password: string) => {
    const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Error en login");

    return response.json();
    };
