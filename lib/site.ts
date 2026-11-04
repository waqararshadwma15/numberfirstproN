/* Contact channels and shared business facts, taken from the live numberfirst.pro site. */
export const site = {
  name: "Numbers First",
  url: "https://numberfirst.pro",
  phone: "+966598565877",
  phoneDisplay: "+966 59 856 5877",
  whatsapp: "966598565877",
  email: "info@numberfirst.pro",
  country: "SA",
  /* Official profiles (LinkedIn, Instagram, X, Google Business Profile, Facebook). Search and AI
     engines use these to confirm the business is the same entity everywhere. Add full URLs here. */
  sameAs: [] as string[],
};

/* Largest business plan emailed as an attachment; Vercel caps a request body at 4.5 MB.
   Larger files are still accepted by the form and sent by the visitor on WhatsApp or email. */
export const MAX_ATTACHMENT = 4 * 1024 * 1024;

/* Form rules, shared by the forms and the server so both agree. */
export const ATTACHABLE = /\.(pdf|docx?|xlsx?|pptx?)$/i;
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Long enough for a real brief, and short enough that the whole request fits one email. */
export const MAX_BRIEF = 4000;
/* Any digits (Arabic-Indic included), with at least seven of them. */
export const isPhone = (value: string) =>
  /^\+?[\p{Nd}\s()-]+$/u.test(value) && (value.match(/\p{Nd}/gu)?.length ?? 0) >= 7;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const clients = [
  { src: "/assets/client-01.png", name: "Point", w: 300, h: 300 },
  { src: "/assets/client-02.png", name: "AIKA Physical Therapy Clinic", w: 316, h: 298 },
  { src: "/assets/client-03.png", name: "APEX Management", w: 202, h: 87 },
  { src: "/assets/client-04.png", name: "Boundless", w: 640, h: 205 },
  { src: "/assets/client-05.png", name: "BOX iQ", w: 295, h: 300 },
  { src: "/assets/client-06.png", name: "B-Padel", w: 331, h: 300 },
  { src: "/assets/client-07.png", name: "Broots Coffee & Cocoa", w: 250, h: 267 },
  { src: "/assets/client-08.png", name: "Elite Medical Service", w: 284, h: 112 },
  { src: "/assets/client-09.png", name: "Haya Design Studio", w: 326, h: 300 },
  { src: "/assets/client-10.png", name: "Kalibr", w: 300, h: 300 },
  { src: "/assets/client-11.png", name: "Nokhal Studios", w: 502, h: 300 },
  { src: "/assets/client-12.png", name: "Origin", w: 600, h: 187 },
] as const;

export const samples = [
  { src: "/assets/sample-2.jpg", w: 1500, h: 812 },
  { src: "/assets/sample-3.jpg", w: 1500, h: 844 },
  { src: "/assets/sample-7.jpg", w: 1500, h: 844 },
] as const;
