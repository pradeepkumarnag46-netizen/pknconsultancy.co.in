import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Phone, Users, Zap, IndianRupee, Globe,
  ShieldCheck, Clock, HeartHandshake, Headphones,
  FileText, Building2, Briefcase, Scale, CreditCard, Palette,
  Star, ChevronRight, CheckCircle2, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const trustItems = [
  { icon: Users, label: "100+ Clients Served", desc: "Trusted by businesses across India" },
  { icon: Zap, label: "Fast & Accurate", desc: "Quick turnaround on all filings" },
  { icon: IndianRupee, label: "Affordable Pricing", desc: "Competitive rates for all services" },
  { icon: Globe, label: "100% Online", desc: "Fully digital, paperless process" },
];

const serviceCategories = [
  {
    title: "GST & Tax Services",
    color: "from-primary/10 to-primary/5",
    services: [
      { icon: FileText, label: "GST Registration", desc: "Quick GST number registration for your business" },
      { icon: FileText, label: "GST Return Filing", desc: "Timely and accurate GST return filing" },
      { icon: CreditCard, label: "TDS Return Filing", desc: "Hassle-free TDS compliance and filing" },
      { icon: FileText, label: "Income Tax Return", desc: "Expert income tax return filing for individuals & businesses" },
    ],
  },
  {
    title: "Business Services",
    color: "from-secondary/10 to-secondary/5",
    services: [
      { icon: Building2, label: "Company Registration", desc: "Private limited, LLP, OPC & more" },
      { icon: Briefcase, label: "Payroll Management", desc: "End-to-end payroll processing & compliance" },
      { icon: ShieldCheck, label: "Business Compliance", desc: "Annual filings, ROC returns & more" },
    ],
  },
  {
    title: "Legal & Digital Services",
    color: "from-gold/10 to-gold/5",
    services: [
      { icon: Scale, label: "Trademark Registration", desc: "Protect your brand identity legally" },
      { icon: CreditCard, label: "PAN & TAN Application", desc: "Quick PAN and TAN registration" },
      { icon: Palette, label: "Website Creation", desc: "Professional websites for your business" },
    ],
  },
];

const whyChoose = [
  { icon: ShieldCheck, title: "Expert Knowledge", desc: "Team of qualified professionals with deep domain expertise in Indian tax and compliance laws." },
  { icon: Clock, title: "On-Time Delivery", desc: "We never miss a deadline. Your filings and registrations are always completed on time." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Premium quality services at prices that work for startups and small businesses." },
  { icon: Headphones, title: "Dedicated Support", desc: "A personal relationship manager for every client. We are always just a call away." },
];

const steps = [
  { step: "01", title: "Contact Us", desc: "Reach out via phone, WhatsApp, or our contact form." },
  { step: "02", title: "Share Documents", desc: "Upload required documents securely through our process." },
  { step: "03", title: "Processing", desc: "Our experts handle filings, registrations & compliance." },
  { step: "04", title: "Completion", desc: "Get your certificates and confirmations delivered." },
];

const testimonials = [
  { name: "Rajesh K.", role: "Startup Founder", text: "PKN Consultancy made our company registration incredibly smooth. They handled everything from GST to compliance. Highly recommended for startups!", rating: 5 },
  { name: "Priya M.", role: "Freelancer", text: "Filing my income tax returns was always stressful until I found PKN. Their team is professional, fast, and very affordable. I feel confident about my tax compliance now.", rating: 5 },
  { name: "Amit S.", role: "Small Business Owner", text: "We have been using PKN for GST filing and payroll for over a year. Their accuracy and on-time delivery is unmatched. Great value for money!", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden bg-hero">
      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-6">
              <HeartHandshake className="w-3.5 h-3.5" /> Trusted by 100+ Businesses
            </span>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6"
          >
            Complete Business, Tax &{" "}
            <span className="text-gradient">Compliance Solutions</span> in India
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            GST, TDS, Income Tax, Payroll, Company Registration, Trademark &amp; Website Creation – All in One Place. Expert services at affordable prices.
          </motion.p>
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex justify-center"
          >
            <Link to="/contact">
              <Button size="lg" className="gap-2 text-base px-8 shadow-lg shadow-primary/20">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Trust Indicators */}
    <section className="py-12 border-y border-border bg-trust-strip">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((t, i) => (
            <motion.div
              key={t.label}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="flex flex-col items-center text-center gap-2 p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-1">
                <t.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-semibold text-sm text-foreground">{t.label}</span>
              <span className="text-xs text-muted-foreground">{t.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 md:py-28 bg-surface-soft">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Professional Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From GST registration to website creation, we provide end-to-end business solutions tailored for Indian businesses.
          </p>
        </div>

        <div className="space-y-12">
          {serviceCategories.map((cat, ci) => (
            <div key={cat.title}>
              <h3 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-primary inline-block" />
                {cat.title}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.services.map((s, si) => (
                  <motion.div
                    key={s.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp} custom={si}
                  >
                    <Card className={`h-full bg-gradient-to-br ${cat.color} border-0 shadow-none hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center mb-4 shadow-sm">
                          <s.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{s.label}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="gap-2">
              View All Services <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-20 md:py-28 bg-surface-card">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">Why PKN</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose PKN Consultancy?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We combine expertise, reliability, and affordability to deliver the best experience for our clients.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((w, i) => (
            <motion.div
              key={w.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            >
              <Card className="h-full text-center border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <w.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">{w.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 md:py-28 bg-section-veil">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">Process</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Getting started with PKN Consultancy is simple. Follow these four easy steps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="relative text-center"
            >
              <div className="text-5xl font-display font-bold text-primary/10 mb-3">{s.step}</div>
              <h4 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8">
                  <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 md:py-28 bg-surface-accent">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
            >
              <Card className="h-full border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-semibold text-primary text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative overflow-hidden py-20 md:py-28 bg-cta text-primary-foreground">
      <div className="container relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Need Help with GST, Tax, or Business Setup?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Our experts are ready to help you with all your business and compliance needs.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8 shadow-lg">
                <CheckCircle2 className="w-4 h-4" /> Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
