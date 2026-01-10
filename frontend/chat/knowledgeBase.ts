
export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface CompanyKnowledge {
  companyName: string;
  tagline: string;
  mission: string;
  email: string;
  url: string;
  services: Service[];
}

export const INITIAL_KNOWLEDGE: CompanyKnowledge = {
  companyName: "Dependify LLC",
  url: "https://dependifyllc.com.ng",
  tagline: "High-End Technology & Software Engineering",
  mission: "Empowering businesses through digital transformation, robust cloud architecture, and cutting-edge software solutions.",
  email: "contact@dependifyllc.com.ng",
  services: [
    {
      title: "Software Development",
      description: "Custom web and mobile applications tailored to your business needs.",
      icon: "fa-code"
    },
    {
      title: "Cloud Solutions",
      description: "Migration, architecture, and management on AWS, Azure, and Google Cloud.",
      icon: "fa-cloud"
    },
    {
      title: "Cybersecurity",
      description: "Robust protection for your digital assets and sensitive data.",
      icon: "fa-shield-halved"
    },
    {
      title: "IT Consulting",
      description: "Strategic planning and technical advisory to drive digital transformation.",
      icon: "fa-lightbulb"
    }
  ]
};
