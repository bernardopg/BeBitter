import {
  BadgeDollarSign,
  BookOpen,
  MonitorPlay,
} from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { CONFIG } from "@/constants/config";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { href: CONFIG.GITHUB_URL, label: "GitHub", icon: GitHubIcon },
    { href: CONFIG.LINKEDIN_URL, label: "LinkedIn", icon: LinkedInIcon },
    { href: CONFIG.INSTAGRAM_URL, label: "Instagram", icon: InstagramIcon },
    { href: CONFIG.X_URL, label: "X", icon: XIcon },
    { href: CONFIG.TIKTOK_URL, label: "TikTok", icon: MonitorPlay },
    { href: CONFIG.WORDPRESS_URL, label: "WordPress", icon: BookOpen },
    { href: CONFIG.SPONSOR_URL, label: "Sponsor", icon: BadgeDollarSign },
  ] as const;

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:min-h-24 md:flex-row md:py-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} {t("hero.title")}. {t("footer.rights")}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Button key={label} asChild variant="ghost" size="sm">
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
