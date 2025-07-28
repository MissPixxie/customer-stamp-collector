// "use client";

// import { getCsrfToken, signIn } from "next-auth/react";
// import { useState, useEffect } from "react";

export default function SignIn() {
  //   const [csrfToken, setCsrfToken] = useState<string | null>(null);
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   useEffect(() => {
  //     getCsrfToken().then((token) => setCsrfToken(token ?? null));
  //   }, []);
  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     await signIn("credentials", { username, password, callbackUrl: "/" });
  //   };
  //   if (!csrfToken) return null;
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
  //       <input
  //         placeholder="Användarnamn"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //         required
  //       />
  //       <input
  //         placeholder="Lösenord"
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">Logga in</button>
  //     </form>
  //   );
  return (
    <div>
      <h1>Sign In Page</h1>
      <h1>Sign In Page</h1>
    </div>
  );
}
