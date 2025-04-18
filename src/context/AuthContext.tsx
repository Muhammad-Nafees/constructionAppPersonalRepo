import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AddIncentivesPayload, IUserData, SignInValues } from "../interface";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";



type AuthContextType = {
    user: IUserData | null;
    setUser: IUserData | any;
    login: (userData: SignInValues) => void;
    logout: () => void;
    adminRegisterFormData: IUserData | null;
    setAdminRegisterFormData: any | null;
    addIncentivesFormData: AddIncentivesPayload | null | any;
    setAddIncentivesFormData: AddIncentivesPayload | any;
};



const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const navigate = useNavigate();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserData | null>(null);
    const [adminRegisterFormData, setAdminRegisterFormData] = useState<IUserData | null>(null);
    const [addIncentivesFormData, setAddIncentivesFormData] = useState<AddIncentivesPayload | null>(null);


    const login = (data: any) => {
        if (data?.token && data?.user) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userData", JSON.stringify(data.user));
            setUser(data.user);
            console.log("🚀 ~ login successful:", data.user);
        } else {
            console.error("Invalid login response", data);
        }
    };



    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    console.log("🚀 ~ AuthProvider ~ user:", user);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        // navigate("/signin");
    };



    return (
        <AuthContext.Provider value={{ user, login, logout, setUser, setAdminRegisterFormData, adminRegisterFormData, addIncentivesFormData, setAddIncentivesFormData }}>
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