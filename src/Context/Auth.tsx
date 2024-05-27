import { createContext, useState, useEffect } from 'react';
import api from "../Services/Api";

type ContextAuthType = {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any | undefined>>
}

const DEFAULT_VALUE: ContextAuthType = {
    user: undefined,
    setUser: () => { }
}

const ContextAuth = createContext({ ...DEFAULT_VALUE });

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const [user, setUser] = useState<any | undefined>();
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }
        setLoading(false)
    }, [])

    return (
        <ContextAuth.Provider value={{ user, setUser }}>
            {!loading && children}
        </ContextAuth.Provider>
    );
}

interface Props {
    children: React.ReactNode;
}

export default ContextAuth