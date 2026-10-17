import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useTheme } from "@/context/ThemeContext";

const ContactForm = ({ lang }) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const formRef = useRef(null);
  const { isDarkMode } = useTheme();

  const getAlertOptions = (text, icon) => ({
    text,
    icon,
    confirmButtonText: lang.success_accept?.text,
    confirmButtonColor: "#52652d",
    background: isDarkMode ? "#20241c" : "#f8f8f2",
    color: isDarkMode ? "#eff0e8" : "#22231f",
  });

  const sendEmail = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries());

    setSendingEmail(true);

    try {
      await emailjs.send(
        "service_zw3pu9r",
        "template_02xr7rq",
        values,
        "Wv5RQ-GtYRv-LL3O9",
      );

      await Swal.fire(getAlertOptions(lang.success_text?.text, "success"));

      formRef.current.reset();
    } catch (error) {
      Swal.fire(
        getAlertOptions(
          error?.text || "An error occurred while sending the message.",
          "error",
        ),
      );
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
      <h3>
        {lang.send_me_a_message?.text}
      </h3>

      <div className="form-field">
        <label htmlFor="contact-name">{lang.name?.text}</label>

        <input
          type="text"
          id="contact-name"
          autoComplete="name"
          name="username"
          placeholder={lang.name_placeholder?.text}
          required
          disabled={sendingEmail}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">{lang.email?.text}</label>

        <input
          type="email"
          id="contact-email"
          autoComplete="email"
          name="email"
          placeholder={lang.email_placeholder?.text}
          required
          disabled={sendingEmail}
        />
      </div>

      <div className="form-field form-field--message">
        <label htmlFor="contact-message">{lang.message?.text}</label>

        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder={lang.message_placeholder?.text}
          maxLength={255}
          required
          disabled={sendingEmail}
        ></textarea>
      </div>

      <button type="submit" className="contact-submit" disabled={sendingEmail}>
        {sendingEmail
          ? lang.sending?.text || "Sending..."
          : lang.send_message?.text}
      </button>
    </form>
  );
};

export default ContactForm;
