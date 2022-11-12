import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { useContext } from "solid-js";
import { createContext } from "solid-js";

const FirebaseContext = createContext<FirebaseApp>();

export function FirebaseProvider(props) {
    const firebaseConfig = {
        apiKey: "AIzaSyB3ePAkU7eEPjUnqJ5IYq_q9xD4STqk3jY",
        authDomain: "biology-class-website.firebaseapp.com",
        projectId: "biology-class-website",
        storageBucket: "biology-class-website.appspot.com",
        messagingSenderId: "586327462516",
        appId: "1:586327462516:web:50a47a3a27d171708bf721"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return (
        <FirebaseContext.Provider value={app}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export function useFirebase(): FirebaseApp {
    return useContext(FirebaseContext);
}

export function useFirebaseAuth(): Auth {
    return getAuth(useFirebase());
}