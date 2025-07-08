import { createContext, useContext, useState, ReactNode, useEffect } from "react";


type GlobalMainContext = {
    setCelebritiesDataContext: React.Dispatch<React.SetStateAction<any>>
    celebritiesDataContext: any;
};



const GlobalContext = createContext<GlobalMainContext | undefined>(undefined);
// const navigate = useNavigate();

export const GlobalMainProvider = ({ children }: { children: ReactNode }) => {

    const [celebritiesDataContext, setCelebritiesDataContext] = useState<any>([]);

    return (
        <GlobalContext.Provider value={{ celebritiesDataContext, setCelebritiesDataContext }}>
            {children}
        </GlobalContext.Provider>
    );
};



export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobal must be used within an GlobalMainProvider");
    }
    return context;
};