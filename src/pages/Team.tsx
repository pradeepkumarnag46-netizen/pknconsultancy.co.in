import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const team = [
  {
    name: "Pradeep Kumar",
    role: "Founder & Financial Consultant",
    initials: "PK",
    accent: "bg-surface-card",
    iconColor: "text-primary",
    bio: "Pradeep Kumar leads PKN Consultancy with over 10+ years of experience in CA firms, bringing deep practical knowledge in financial and regulatory domains. He specializes in Income Tax Compliances, TDS Compliances, and Trademark Registration, ensuring clients receive accurate and legally sound solutions. His experience across diverse industries helps in understanding real business challenges and providing practical guidance. He is committed to delivering services with precision, transparency, and timely execution, ensuring complete client satisfaction.",
  },
  {
    name: "Priyanka",
    role: "Business & Digital Solutions Specialist",
    initials: "P",
    accent: "bg-surface-accent",
    iconColor: "text-secondary",
    bio: "Priyanka brings over 10+ years of professional experience, along with a strong academic background in B.Com and M.Com, enabling her to combine business knowledge with practical execution. She specializes in Website Creation and Business Compliances, helping clients build a strong professional presence while ensuring smooth regulatory processes. Her approach focuses on clear communication, structured workflow, and timely delivery, ensuring clients experience efficiency and reliability at every step.",
  },
  {
    name: "Aakash",
    role: "GST & Payroll Specialist",
    initials: "A",
    accent: "bg-section-veil",
    iconColor: "text-accent-foreground",
    bio: "Aakash specializes in GST Compliances and Payroll Management, ensuring accurate calculations and timely submissions for businesses. He handles end-to-end GST processes and payroll systems with a strong focus on compliance and efficiency. His detail-oriented approach ensures that businesses avoid penalties and maintain smooth financial operations. He is dedicated to delivering accurate, consistent, and reliable support for all compliance-related activities.",
  },
];

const Team = () => (
  <Layout>
    <section className="py-20 md:py-28 bg-page-header">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our <span className="text-gradient">Team</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed">
            Experienced professionals dedicated to your business success. Our team brings together expertise in finance, compliance, and digital solutions to serve you better.
          </motion.p>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((m, i) => (
            <motion.div key={m.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className={`${m.accent} p-8 flex flex-col items-center text-center`}>
                  <div className="w-24 h-24 rounded-full bg-background shadow-lg flex items-center justify-center mb-4 border-4 border-background">
                    <span className={`font-display font-bold text-3xl ${m.iconColor}`}>{m.initials}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">{m.name}</h3>
                  <p className={`text-sm font-semibold mt-1 ${m.iconColor}`}>{m.role}</p>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-cta text-primary-foreground">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
          Let our experienced team handle your business compliance while you focus on growth.
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

export default Team;
