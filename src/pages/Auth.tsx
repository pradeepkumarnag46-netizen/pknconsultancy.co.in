import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Lock } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "Check your email to confirm, then sign in." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast({ title: "Authentication failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 min-h-[70vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container max-w-md">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
                Admin {mode === "signup" ? "Sign Up" : "Sign In"}
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Access your contact form messages
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="email" placeholder="Email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password (min 6 chars)" required minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
                </Button>
              </form>
              <button
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground"
              >
                {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
