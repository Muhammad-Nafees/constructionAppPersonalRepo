import { createContext, useContext, useState, ReactNode } from "react";
import { SignInValues } from "../interface";
import { toast } from "react-toastify";


type AuthContextType = {
    user: SignInValues | null;
    setUser: SignInValues | any;
    login: (userData: SignInValues) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<SignInValues | null>(null);
    console.log("🚀 ~ AuthProvider ~ user:", user);

    const login = (userData: any) => {
        setUser(userData)
        localStorage.setItem("token", userData?.data?.token)
        localStorage.setItem("userData", JSON.stringify(userData.data));
        localStorage.setItem("loggedIn", "true")
    };



    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("loggedIn");
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};