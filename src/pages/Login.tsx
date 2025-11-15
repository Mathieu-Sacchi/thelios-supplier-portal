import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (username && password) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-header text-header-foreground border-b-2 border-border">
        <div className="px-4 py-3">
          <h1 className="text-sm font-bold tracking-wider">SUPLLIER COLLABORATION PORTAL</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-card border-2 border-border">
            {/* Title bar */}
            <div className="bg-secondary border-b-2 border-border px-4 py-2">
              <h2 className="text-sm font-semibold">Supplar access</h2>
            </div>

            {/* Form content */}
            <div className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border-2 border-border bg-input rounded-none focus:outline-none focus:border-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border-2 border-border bg-input rounded-none focus:outline-none focus:border-ring"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    className="px-6 py-1.5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-border rounded-none"
                  >
                    LOGIN
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-xs text-primary underline hover:no-underline"
                  >
                    Forget your password?
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            © 2013 SUPPLIER COLLABORATION PORTAL - All rights reserved
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
