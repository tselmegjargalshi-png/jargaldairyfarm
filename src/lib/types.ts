// Shared content types. Kept free of runtime imports so that
// scripts/db-setup.ts can import seed data with Node's type stripping.

export type ArticleStatus = "draft" | "published";

export type Article = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  /** Simple Markdown: ## headings, paragraphs, - lists, **bold** */
  body: string;
  category: string;
  coverUrl: string;
  status: ArticleStatus;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  seoTitle: string;
  seoDescription: string;
};

export type MediaKind = "image" | "video";

export type MediaItem = {
  id?: number;
  title: string;
  description: string;
  category: string;
  kind: MediaKind;
  url: string;
  posterUrl: string;
  /** true = example / stand-in material, labelled as such on the site */
  isSample: boolean;
  sortOrder: number;
  createdAt: string;
};

export type ServiceStatus = "interest" | "open" | "paused";

export type Service = {
  id?: number;
  slug: string;
  title: string;
  summary: string;
  details: string;
  status: ServiceStatus;
  /** Only shown when the owner has confirmed it */
  priceNote: string;
  scheduleNote: string;
  sortOrder: number;
};

export type SiteImages = {
  hero: string;
  portrait: string;
  milking: string;
  manure: string;
  barn: string;
  feeding: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  facebook: string;
  youtube: string;
  instagram: string;
  address: string;
  mapUrl: string;
  hours: string;
};

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string;
  founderQuote: string;
  contact: ContactInfo;
  images: SiteImages;
};

export type InquiryKind = "partnership" | "interest" | "contact" | "meeting" | "training";
export type InquiryStatus = "new" | "read" | "archived";

export type Inquiry = {
  id: number;
  kind: InquiryKind;
  orgName: string;
  contactName: string;
  phone: string;
  email: string;
  topic: string;
  preferredTime: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
};
