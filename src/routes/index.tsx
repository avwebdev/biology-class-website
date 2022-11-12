import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { useFirebase } from "~/contexts/Firebase";

import { getAuth } from "firebase/auth";

export default function Home() {
  const app = useFirebase();
  const auth = getAuth(app);
  console.log(auth);
  return (
    <main>
      <Title>Home Page</Title>
      <h1>This is the Home Page!</h1>
      <Counter />
      <p>
        Updates
      </p>
      <p>Calendar</p>
      
    </main>
  );
}
