import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";
import { showSuccess } from "@/utils/toast";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:bernardo.gomes@bebitterbebetter.com.br?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    showSuccess(t("contact.form.success"));

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="h-full border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-lg gradient-primary text-white">
            <Mail className="h-4.5 w-4.5" />
          </span>
          {t("contact.form.title")}
        </CardTitle>
        <CardDescription>{t("contact.form.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">{t("contact.form.name")}</Label>
              <Input
                id="contact-name"
                name="name"
                placeholder={t("contact.form.name")}
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">{t("contact.form.email")}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t("contact.form.email")}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-message">{t("contact.form.message")}</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder={t("contact.form.message")}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="gradient" size="lg" className="w-full btn-enhanced">
            <Send className="mr-2 h-4 w-4" />
            {t("contact.form.send")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
