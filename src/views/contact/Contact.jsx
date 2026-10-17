import ContactHeader from "@/views/contact/components/ContactHeader";
import ContactForm from "@/views/contact/components/ContactForm";
import ContactAnimation from "@/views/contact/components/ContactAnimation";

const Contact = ({ lang }) => {
  return (
    <section className="section-shell contact-section" id="contact">
      <ContactHeader lang={lang} />

      <div className="contact-grid">
        <div>
          <ContactForm lang={lang} />
        </div>

        <div className="contact-aside">
          <ContactAnimation lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
