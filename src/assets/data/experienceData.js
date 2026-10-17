import aiLogo from "@/assets/img/icons/ai.svg";
import juniorCoffeeLogo from "@/assets/img/icons/junior.svg";
import techSupportLogo from "@/assets/img/icons/techsupport.svg";
import devLogo from "@/assets/img/icons/dev.svg";
import proffesorLogo from "@/assets/img/icons/proffesor.svg";

export const getExperienceData = (lang) => ({
  laboral: [
    {
      icon: proffesorLogo,
      alt: "Professor Logo",
      time: lang.utec_time?.text,
      title: lang.utec_job?.text,
      description: `${lang.university?.text}. - El Salvador.`,
    },
    {
      icon: devLogo,
      alt: "Web Developer Logo",
      time: lang.sms_time?.text,
      title: lang.sms_job?.text,
      description: `${lang.sms?.text}. - El Salvador.`,
    },
    {
      icon: juniorCoffeeLogo,
      alt: "Buy me a Coffee Logo",
      time: lang.tec101_time?.text,
      title: lang.tec101_job?.text,
      description: `${lang.tec_101?.text}. - El Salvador.`,
    },
    {
      icon: juniorCoffeeLogo,
      alt: "Buy me a Coffee Logo",
      time: lang.codeEye_time?.text,
      title: lang.codeEye_job?.text,
      description: `${lang.codeeye?.text}. - Canadá / El Salvador.`,
    },
    {
      icon: techSupportLogo,
      alt: "Technical Support Logo",
      time: lang.mutual_fund_time?.text,
      title: lang.mutual_fund_job?.text,
      description: `${lang.mutual_fund?.text} - El Salvador.`,
    },
  ],

  education: [
    {
      icon: aiLogo,
      alt: "Artificial Intelligence Logo",
      time: lang.pre_specialty_time?.text,
      title: lang.pre_specialty_title?.text,
      description: `${lang.university?.text}. - El Salvador.`,
    },
    {
      icon: devLogo,
      alt: "Developer Logo",
      time: "2020 - 2024",
      title: `${lang.about_description_title?.text}.`,
      description: `${lang.university?.text}. - El Salvador.`,
    },
  ],
});
