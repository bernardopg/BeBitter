import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactSection } from "../ContactSection";

vi.mock("@/components/Analytics", () => ({
  useAnalytics: () => ({
    trackButtonClick: vi.fn(),
    trackContactAttempt: vi.fn(),
  }),
}));

vi.mock("@/components/ContactForm", () => ({
  default: () => <form data-testid="contact-form" />,
}));

vi.mock("@/constants/config", () => ({
  CONFIG: {
    EMAIL: "test@example.com",
    WHATSAPP_URL: "https://wa.me/123",
  },
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "contact.subtitle": "Get in Touch",
        "contact.title": "Contact Me",
        "contact.description": "Let's work together",
        "contact.methods.title": "Contact Methods",
        "contact.methods.description": "Choose how to reach me",
        "contact.email": "test@example.com",
        "contact.clickToCopy": "Click to copy",
        "contact.whatsapp": "WhatsApp",
        "contact.scheduleCall": "Schedule a Call",
        "contact.responseTime": "Usually replies within 24h",
      };
      return translations[key] || key;
    },
    language: "en",
  }),
}));

vi.mock("@/hooks/useScrollAnimation", () => ({
  useScrollAnimation: () => ({
    registerElement: vi.fn(),
    isVisible: () => true,
    getAnimationProps: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
  }),
}));

vi.mock("@/utils/toast", () => ({
  showSuccess: vi.fn(),
}));

vi.mock("framer-motion", () => ({
  m: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement> & { children?: React.ReactNode }) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}));

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders section with id=contact", () => {
    render(<ContactSection />);
    expect(document.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders contact title and description", () => {
    render(<ContactSection />);
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByText("Let's work together")).toBeInTheDocument();
  });

  it("renders contact form", () => {
    render(<ContactSection />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("renders whatsapp contact link", () => {
    render(<ContactSection />);
    const whatsappLinks = screen.getAllByText("WhatsApp");
    expect(whatsappLinks.length).toBeGreaterThan(0);
  });
});
