import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { LogOut, Mail, Phone, Trash2, RefreshCw, Inbox } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load messages", description: error.message, variant: "destructive" });
    } else {
      setSubmissions(data || []);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      setUserEmail(session.user.email || "");
      setUserId(session.user.id);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) await loadSubmissions();
      setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((s) => s.filter((x) => x.id !== id));
      toast({ title: "Message deleted" });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="py-20 md:py-28">
          <div className="container max-w-2xl">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h1 className="font-display text-2xl font-bold text-foreground mb-3">
                  Admin Access Required
                </h1>
                <p className="text-muted-foreground mb-2">
                  You're signed in as <strong>{userEmail}</strong>, but this account doesn't have admin access yet.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  To grant yourself admin access, run this in your backend SQL editor:
                </p>
                <pre className="bg-muted p-4 rounded-lg text-left text-xs overflow-x-auto mb-6">
                  {`INSERT INTO public.user_roles (user_id, role)\nVALUES ('${userId}', 'admin');`}
                </pre>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleSignOut} className="gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-page-header">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Contact <span className="text-gradient">Messages</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {submissions.length} total message{submissions.length !== 1 ? "s" : ""} • signed in as {userEmail}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadSubmissions} className="gap-2">
                <RefreshCw className="w-4 h-4" /> Refresh
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>

          {submissions.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No messages yet. They'll appear here when someone submits the contact form.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((s) => (
                <Card key={s.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{s.name}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                          <a href={`mailto:${s.email}`} className="flex items-center gap-1 hover:text-primary">
                            <Mail className="w-3.5 h-3.5" /> {s.email}
                          </a>
                          {s.phone && (
                            <a href={`tel:${s.phone}`} className="flex items-center gap-1 hover:text-primary">
                              <Phone className="w-3.5 h-3.5" /> {s.phone}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {s.service && <Badge variant="secondary">{s.service}</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {new Date(s.created_at).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost" size="sm"
                          onClick={() => handleDelete(s.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed bg-muted/40 p-4 rounded-lg">
                      {s.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
