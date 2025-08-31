// services/authService.ts


export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  try {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Email ou mot de passe invalide");
    }

    const result = await res.json();
    localStorage.setItem("token", result.token);

    return result;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};
