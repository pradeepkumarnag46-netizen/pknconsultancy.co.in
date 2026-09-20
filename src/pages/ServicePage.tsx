import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const serviceData: Record<string, {
  title: string; metaTitle: string; description: string;
  features: string[]; process: string[]; longDesc: string;
}> = {
  gst: {
    title: "GST Registration & Filing Services",
    metaTitle: "GST Registration & Return Filing Services in India | PKN Consultancy",
    description: "Complete GST registration and return filing services for businesses across India. Fast, accurate, and affordable.",
    features: [
      "New GST Registration", "GST Return Filing (GSTR-1, GSTR-3B, GSTR-9)",
      "GST Amendment & Modification", "GST Cancellation & Revocation",
      "GST Annual Return Filing", "Input Tax Credit Reconciliation",
      "E-way Bill Generation", "GST Compliance Advisory",
    ],
    process: ["Submit business documents", "We verify and prepare the application", "File with GST portal", "Receive your GSTIN"],
    longDesc: "GST (Goods and Services Tax) is mandatory for businesses exceeding the turnover threshold in India. Whether you are a startup, small business, or freelancer, PKN Consultancy provides end-to-end GST registration and return filing services. Our expert team ensures timely filing of GSTR-1, GSTR-3B, and annual returns, helping you avoid penalties and stay compliant. We also assist with GST amendments, cancellation, revocation, and input tax credit reconciliation.",
  },
  tds: {
    title: "TDS Return Filing Services",
    metaTitle: "TDS Return Filing Services in India | PKN Consultancy",
    description: "Professional TDS return filing and compliance services. Timely filing, accurate calculations, and complete support.",
    features: [
      "Quarterly TDS Return Filing", "TDS Certificate Generation (Form 16/16A)",
      "TDS Payment & Challan", "TDS on Salary Computation",
      "Lower Deduction Certificate", "TDS Refund Processing",
      "TDS Compliance Advisory", "TDS Correction Statements",
    ],
    process: ["Share salary/payment details", "We compute TDS liability", "File TDS returns on time", "Generate TDS certificates"],
    longDesc: "Tax Deducted at Source (TDS) is a critical compliance requirement for businesses and employers in India. PKN Consultancy handles your complete TDS compliance including quarterly return filing, challan payments, Form 16/16A generation, and correction statements. Our team ensures accurate computation and timely filing to avoid interest and penalties under sections 234E and 271H.",
  },
  "income-tax": {
    title: "Income Tax Return Filing Services",
    metaTitle: "Income Tax Return Filing Services in India | PKN Consultancy",
    description: "Expert income tax return filing for individuals, HUF, businesses, and freelancers. All ITR forms covered.",
    features: [
      "ITR Filing for Individuals & HUF", "ITR Filing for Businesses & Firms",
      "ITR Filing for Freelancers", "Capital Gains Tax Computation",
      "Tax Planning & Advisory", "Advance Tax Calculation",
      "Income Tax Refund Processing", "Response to IT Notices",
    ],
    process: ["Share income documents", "We review and compute tax", "Prepare and file ITR", "E-verify and confirmation"],
    longDesc: "Filing income tax returns is a legal obligation for individuals and businesses in India. PKN Consultancy provides expert income tax return filing services for all ITR forms – from salaried individuals to businesses with complex income structures. We handle capital gains computation, freelancer taxation, advance tax calculations, and response to income tax notices. Our goal is to ensure maximum legitimate tax savings while keeping you fully compliant.",
  },
  "company-registration": {
    title: "Company Registration Services",
    metaTitle: "Company Registration Services in India | PKN Consultancy",
    description: "Register your company in India – Private Limited, LLP, OPC, Partnership. Complete incorporation support.",
    features: [
      "Private Limited Company Registration", "Limited Liability Partnership (LLP)",
      "One Person Company (OPC)", "Partnership Firm Registration",
      "Sole Proprietorship Registration", "Section 8 Company (NGO)",
      "Digital Signature Certificate (DSC)", "Director Identification Number (DIN)",
    ],
    process: ["Choose company structure", "Submit required documents", "We file with MCA", "Receive incorporation certificate"],
    longDesc: "Starting a business in India begins with proper registration. PKN Consultancy provides complete company registration services including Private Limited Company, LLP, OPC, Partnership Firm, and Sole Proprietorship. We handle everything from DSC and DIN application to MCA filing and incorporation certificate delivery. Our experts also guide you on choosing the right business structure based on your goals, liability preferences, and tax implications.",
  },
  payroll: {
    title: "Payroll Management Services",
    metaTitle: "Payroll Management Services in India | PKN Consultancy",
    description: "End-to-end payroll processing, salary structuring, PF/ESI compliance, and payslip generation.",
    features: [
      "Monthly Payroll Processing", "Salary Structuring & Optimization",
      "PF & ESI Compliance", "Professional Tax Filing",
      "Payslip Generation", "Full & Final Settlement",
      "Bonus & Gratuity Calculation", "Form 16 Generation",
    ],
    process: ["Share employee details", "We structure and process payroll", "Handle statutory compliance", "Generate payslips & reports"],
    longDesc: "Managing payroll can be complex and time-consuming for growing businesses. PKN Consultancy provides comprehensive payroll management services including monthly processing, salary structuring, PF/ESI compliance, professional tax filing, and payslip generation. We ensure your employees are paid accurately and on time while keeping your business compliant with all labor laws and statutory requirements.",
  },
  trademark: {
    title: "Trademark Registration Services",
    metaTitle: "Trademark Registration Services in India | PKN Consultancy",
    description: "Protect your brand with trademark search, application, and registration across all classes in India.",
    features: [
      "Trademark Search & Analysis", "Trademark Application Filing",
      "Trademark Objection Reply", "Trademark Opposition Handling",
      "Trademark Renewal", "Logo & Brand Name Protection",
      "Multi-class Registration", "Trademark Monitoring",
    ],
    process: ["Conduct trademark search", "Prepare and file application", "Handle objections if any", "Receive registration certificate"],
    longDesc: "Your brand is your most valuable asset. PKN Consultancy helps you protect it with comprehensive trademark registration services. We conduct thorough trademark searches, file applications across all classes, handle objections and oppositions, and ensure your brand name and logo are legally protected. We also provide trademark renewal and monitoring services to maintain ongoing protection.",
  },
  "website-creation": {
    title: "Website Creation Services",
    metaTitle: "Professional Website Creation Services in India | PKN Consultancy",
    description: "Professional, mobile-friendly website design and development for businesses and startups in India.",
    features: [
      "Business Website Design", "E-commerce Website Development",
      "Mobile-Responsive Design", "SEO-Optimized Structure",
      "Domain & Hosting Setup", "Content Management System",
      "Website Maintenance & Support", "Google Business Integration",
    ],
    process: ["Discuss your requirements", "We design and develop", "Review and feedback", "Launch your website"],
    longDesc: "In today's digital-first world, every business needs a professional website. PKN Consultancy provides affordable website creation services for businesses and startups in India. We build mobile-responsive, SEO-optimized websites with modern design, fast loading speeds, and easy content management. From business websites to e-commerce stores, we deliver complete digital solutions including domain, hosting, and ongoing maintenance.",
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceData[slug || ""];

  if (!service) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services"><Button>View All Services</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 md:py-28 bg-page-header">
        <div className="container">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="max-w-3xl">
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {service.title}
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{service.longDesc}</p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f, i) => (
                    <motion.div key={f} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 4} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Our Process</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.process.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                      <span className="text-2xl font-display font-bold text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-sm text-foreground pt-1">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-cta text-primary-foreground border-0 sticky top-24">
                <CardContent className="p-8 text-center">
                  <h3 className="font-display text-xl font-bold mb-2">Get Started Today</h3>
                  <p className="text-sm opacity-90 mb-6">Reach out to our experts and we'll guide you through the process.</p>
                  <Link to="/contact" className="block">
                    <Button variant="secondary" className="w-full gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;
