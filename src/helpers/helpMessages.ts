const helpMessages: Record<string, string | undefined> = {
  "Wrong password": "Senha incorreta",
  "User not found": "Usuário não encontrado",
  "Something went wrong": "Algo deu errado",
  "Email not registered": "Usuário não registrado",
};

export const getHelpMessage = (message: string | undefined): string => {
  if (!message || typeof message !== "string") return "";
  return helpMessages[message] || message;
};

export default getHelpMessage;
