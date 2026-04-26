import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98911 92069", href: "tel:+919891192069" },
  { icon: Mail, label: "Email", value: "pknconsultancy06@gmail.com", href: "mailto:pknconsultancy06@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919891192069" },
  { icon: MapPin, label: "Location", value: "A-345, Pradhan Enclave, Burari, Delhi-110084", href: "#" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const baseMessageRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "Voice input not supported",
        description: "Please use Chrome or Edge browser for voice-to-text.",
        variant: "destructive",
      });
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    baseMessageRef.current = form.message ? form.message + " " : "";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setForm((prev) => ({ ...prev, message: (baseMessageRef.current + transcript).slice(0, 1000) }));
    };

    recognition.onerror = (event: any) => {
      setListening(false);
      if (event.error !== "aborted" && event.error !== "no-speech") {
        toast({
          title: "Voice input error",
          description: "Please allow microphone access and try again.",
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        service: form.service.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      toast({
        title: "Could not send message",
        description: "Please try again or reach us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact <span className="text-gradient">Us</span>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed">
              Have questions about GST, tax filing, or business registration? Reach out to us for a free consultation.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                        <Input
                          required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                        <Input
                          required type="email" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          maxLength={255}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                        <Input
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          maxLength={15}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Service Needed</label>
                        <Input
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          placeholder="e.g. GST Registration"
                          maxLength={100}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-medium text-foreground">Message *</label>
                        <button
                          type="button"
                          onClick={toggleVoiceInput}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${
                            listening
                              ? "bg-destructive text-destructive-foreground border-destructive animate-pulse"
                              : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                          aria-label={listening ? "Stop voice input" : "Start voice input"}
                        >
                          {listening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                          {listening ? "Listening..." : "Voice to Text"}
                        </button>
                      </div>
                      <Textarea
                        required value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your requirements... or click the mic to speak"
                        rows={5}
                        maxLength={1000}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {form.message.length}/1000 characters
                      </p>
                    </div>
                    <Button type="submit" size="lg" disabled={submitting} className="gap-2 w-full sm:w-auto">
                      <Send className="w-4 h-4" /> {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((c, i) => (
                <motion.div key={c.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <c.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
                          <div className="font-semibold text-foreground">{c.value}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}

              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 mt-6">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-4 opacity-90" />
                  <h3 className="font-display text-xl font-bold mb-2">Free Consultation</h3>
                  <p className="text-sm opacity-90 mb-4">Get expert advice on your tax and business needs at no cost.</p>
                  <a href="https://wa.me/919891192069" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="gap-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Us
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
