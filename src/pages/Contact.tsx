import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98911 92069", href: "tel:+919891192069" },
  { icon: Mail, label: "Email", value: "pknconsultancy06@gmail.com", href: "mailto:pknconsultancy06@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919891192069" },
  { icon: MapPin, label: "Location", value: "India", href: "#" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
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
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                      <Textarea
                        required value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        maxLength={1000}
                      />
                    </div>
                    <Button type="submit" size="lg" className="gap-2 w-full sm:w-auto">
                      <Send className="w-4 h-4" /> Send Message
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
