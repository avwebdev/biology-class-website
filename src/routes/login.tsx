import { createEffect } from "solid-js";
import { Show } from "solid-js/web";
import { useAuth } from "~/contexts/Auth";

export default function Login() {
    const [user, {initiateLogin, registerRedirectResult}] = useAuth();
    registerRedirectResult();
    createEffect(() => {
        console.log("User state change: ", user())
    })
    return (
        <>
            <button onClick={() => {initiateLogin()}}>Login with google</button>
            <Show when={user !== null}>
                <p>Welcome, {user()?.displayName}</p>
            </Show>
        </>
    )
}