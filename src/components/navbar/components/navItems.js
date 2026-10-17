const getNavItems = (lang) => [
  {
    id: "#",
    label: lang.home?.text,
    icon: "bx-home-alt-2",
  },
  {
    id: "#about",
    label: lang.about?.text,
    icon: "bx-planet",
  },
  {
    id: "#experience",
    label: lang.experience?.text,
    icon: "bx-laptop",
  },
  {
    id: "#skills",
    label: lang.skills?.text,
    icon: "bx-code",
  },
  {
    id: "#portfolio",
    label: lang.portfolio?.text,
    icon: "bx-image",
  },
  {
    id: "#contact",
    label: lang.contact?.text,
    icon: "bx-send",
  },
];

export default getNavItems;
