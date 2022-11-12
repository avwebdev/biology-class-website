import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, User } from "firebase/auth";
import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { useFirebaseAuth } from "./Firebase";

type AuthType = [Accessor<User>, {
    initiateLogin(): void;
    registerRedirectResult(): void;
}]
const AuthContext = createContext<AuthType>();

export function AuthProvider(props) {
    const [user, setUser] = createSignal<User>(null);
    const firebaseAuth = useFirebaseAuth();
    const provider = new GoogleAuthProvider();
    onAuthStateChanged(firebaseAuth, (newUser) => {
        setUser(newUser);
    })
    const auth = [
        user,
        {
            initiateLogin() {
                signInWithRedirect(firebaseAuth, provider);
            },
            registerRedirectResult() {
                getRedirectResult(firebaseAuth)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access Google APIs.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        // The signed-in user info.
                        const user = result.user;
                        setUser(user);
                    }).catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage)
                    });
            }
        }
    ]

    return (
        // @ts-ignore
        <AuthContext.Provider value={auth}>
            { props.children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext<AuthType>(AuthContext);
}