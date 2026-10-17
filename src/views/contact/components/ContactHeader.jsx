const ContactHeader = ({ lang }) => {
  return (
    <div className="section-heading">
      <span className="section-kicker">{lang.contact_kicker?.text}</span>
      <h1 className="fw-semibold">{lang.contact_me?.text}</h1>
      <label className="section-subtitle fw-semibold">
        {lang.contact_subtitle?.text}
      </label>
    </div>
  );
};

export default ContactHeader;
