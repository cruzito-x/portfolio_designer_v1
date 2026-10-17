const socialLinks = [
  {
    href: "https://www.linkedin.com/in/cruzsv",
    icon: "bxl-linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/cruzito-x",
    icon: "bxl-github",
    label: "GitHub",
  },
  {
    href: "https://instagram.com/cruzito.x_",
    icon: "bxl-instagram",
    label: "Instagram",
  },
];

const SocialLinks = () => {
  return (
    <ul className="hero-socials p-0" style={{ listStyle: "none" }}>
      {socialLinks.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            className="fs-3 enphasis-text-dark"
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
          >
            <i className={`bx ${social.icon}`}></i>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
