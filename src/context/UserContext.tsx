import { createContext, useContext, useReducer } from "react";

export interface User {
    userUID: string|null,
    email: string|null
}

type UserAction = 
    {type: "setUser"; payload: User | null}


interface UserContext {
    user : User | null,
    dispatch: React.Dispatch<UserAction>
}

const UserContext = createContext<UserContext>({
    user : null,
    dispatch: () => null
});

function UserReducer(user: User | null, action: UserAction): User | null {
    switch (action.type) {
        case "setUser":
            return action.payload;
        default:
            throw new Error("Unknown action");      
    }
}

export function UserProvider({children}: {children: React.ReactElement}){
    const [user, dispatch] = useReducer(UserReducer, null);

    return (
        <UserContext.Provider value={{user, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}