import { createContext } from "react";

export const StoredCredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}});