import type { Metadata } from "next";
import HomeEnquiryPopup from "@/app/enquiry/HomeEnquiryPopup";
import Hero from "@/components/hero/hero";
import About from "@/components/about/about";
import Contact from "@/components/contact/contact";
import Testimonial from "@/components/testimonial/testimonial";
import Clients from "@/components/clients/clients";
import Services from "@/components/service/service";
import Blog from "@/components/blog/blog";
import BusinessPartners from "@/components/partners/businessPartners";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HomeEnquiryPopup />

      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Clients />
        <Blog />
        <BusinessPartners />
        <Testimonial />
        <Contact />
      </main>
    </>
  );
}