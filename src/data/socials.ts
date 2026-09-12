import type { ComponentType } from "react";
import {
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  MailIcon,
} from "../components/icons";

export type Social = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rahmat-fajar-saputra-90690a287/",
    Icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jaarruu_",
    Icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/62895600077007",
    Icon: WhatsappIcon,
  },
  {
    label: "Email",
    href: "mailto:fajar.saputra2907@gmail.com",
    Icon: MailIcon,
  },
];
