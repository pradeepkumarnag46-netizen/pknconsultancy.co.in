import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, CheckCircle2, Users, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "We maintain the highest standards of honesty and transparency in every engagement." },
  { icon: Users, title: "Client-First", desc: "Your success is our success. We go above and beyond to deliver results." },
  { icon: Award, title: "Excellence", desc: "We strive for the highest quality in every filing, registration, and consultation." },
  { icon: Heart, title: "Commitment", desc: "We are deeply committed to helping Indian businesses grow and stay compliant." },
];

const About = () => (
  <Layout>
    <section className="py-20 md:py-28 bg-page-header">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-gradient">PKN Consultancy</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed">
            PKN Consultancy is a trusted name in business advisory, tax compliance, and digital services in India. We help small businesses, startups, freelancers, and individuals navigate the complexities of Indian tax laws and business regulations with ease.
          </motion.p>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To simplify business compliance and empower Indian entrepreneurs by providing affordable, accurate, and timely tax, legal, and digital services. We believe every business deserves access to expert financial guidance regardless of size.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From GST registration and income tax return filing to company registration and trademark protection, we cover the entire lifecycle of business compliance so you can focus on what matters most – growing your business.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To become India's most trusted one-stop platform for business, tax, and compliance services. We envision a future where every Indian entrepreneur has the support and guidance they need to build successful, compliant businesses.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are continuously expanding our services and technology to serve businesses across all states in India with the same level of quality, speed, and personal attention that our clients have come to expect.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we do at PKN Consultancy.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full text-center border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">{v.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cta text-primary-foreground">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          Let us handle your business compliance while you focus on growth.
        </p>
        <Link to="/contact">
          <Button size="lg" variant="secondary" className="gap-2 text-base px-8 shadow-lg">
            <CheckCircle2 className="w-4 h-4" /> Contact Us Today
          </Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default About;
