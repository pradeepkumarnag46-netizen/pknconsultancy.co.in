import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, Building2, Briefcase, Scale, CreditCard, Palette,
  ShieldCheck, ChevronRight, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const allServices = [
  { icon: FileText, title: "GST Registration & Filing", desc: "Complete GST registration, monthly/quarterly return filing, and compliance support for businesses of all sizes.", link: "/services/gst" },
  { icon: CreditCard, title: "TDS Return Filing", desc: "Accurate and timely TDS return filing, TDS certificate generation, and compliance advisory services.", link: "/services/tds" },
  { icon: FileText, title: "Income Tax Return Filing", desc: "Expert income tax return filing for individuals, HUF, businesses, and freelancers across all ITR forms.", link: "/services/income-tax" },
  { icon: Building2, title: "Company Registration", desc: "Private Limited, LLP, OPC, Partnership, and Sole Proprietorship registration with end-to-end support.", link: "/services/company-registration" },
  { icon: Briefcase, title: "Payroll Management", desc: "Complete payroll processing, salary structuring, PF/ESI compliance, and payslip generation services.", link: "/services/payroll" },
  { icon: ShieldCheck, title: "Business Compliance", desc: "Annual filings, ROC returns, board resolutions, and ongoing compliance management for companies.", link: "/services" },
  { icon: Scale, title: "Trademark Registration", desc: "Protect your brand with trademark search, application, and registration across all classes.", link: "/services/trademark" },
  { icon: CreditCard, title: "PAN & TAN Application", desc: "Quick PAN card and TAN registration for individuals, businesses, and organizations.", link: "/services" },
  { icon: Palette, title: "Website Creation", desc: "Professional, mobile-friendly website design and development for businesses and startups.", link: "/services/website-creation" },
];

const Services = () => (
  <Layout>
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive business, tax, compliance, and digital services designed for Indian businesses. From GST registration to website creation, we have you covered.
          </motion.p>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((s, i) => (
            <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 3}>
              <Link to={s.link}>
                <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          Reach out and we will find the right services for your business needs.
        </p>
        <Link to="/contact">
          <Button size="lg" variant="secondary" className="gap-2 text-base px-8 shadow-lg">
            <CheckCircle2 className="w-4 h-4" /> Contact Us
          </Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;
