import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Sign-in result:", result);

    if (result?.ok) {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      console.log("Session:", session);

      const role = session.user?.role;
      console.log("User role:", role);

      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "employee") router.push("/employee/dashboard");
      else if (role === "partner") router.push("/partner/dashboard");
      else if (role === "client") router.push("/client/dashboard");
      else router.push("/");
    } else {
      console.error("Login failed:", result?.error);
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-normal text-center mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type=     "password"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ✅ This MUST be inside a function, not top-level
export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return { props: { csrfToken } };
}
