export const SITE_CONFIG = {
  name: "Nirvana Optical",
  tagline: "See Better",
  description:
    "Professional optometry services in Mahikeng. Comprehensive eye exams, contact lenses, prescription eyeglasses, and more.",
  url: "https://nirvanaoptical.co.za",
  phone: "018 338 1015",
  email: "admin@nirvanaoptical.com",
  whatsapp: "27772448421",
  address: {
    street: "Shop No 13, Cnr First Street & Bessemer Street",
    city: "Mahikeng",
    province: "North West",
    country: "South Africa",
    postalCode: "2745",
  },
  hours: [
    { day: "Monday", open: "08:00", close: "17:00" },
    { day: "Tuesday", open: "08:00", close: "17:00" },
    { day: "Wednesday", open: "08:00", close: "17:00" },
    { day: "Thursday", open: "08:00", close: "17:00" },
    { day: "Friday", open: "08:00", close: "17:00" },
    { day: "Saturday", open: "08:00", close: "13:00" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],
  setmoreUrl: "https://nirvanaoptical.setmore.com/victor",
  social: {
    facebook: "https://www.facebook.com/NirvanaOptical",
    instagram: "https://www.instagram.com/nirvana_optical",
  },
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "Our Practice" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Eyewear" },
  { href: "/offers", label: "Offers" },
  { href: "/medical-aid", label: "Prices" },
  { href: "/blog", label: "Eye Health" },
  { href: "/contact", label: "Contact Us" },
  { href: "/location", label: "Find Us" },
] as const;

export const SERVICES = [
  {
    id: "eye-exams",
    title: "Comprehensive Eye Exams",
    shortTitle: "Eye Exams",
    description:
      "Thorough vision and eye health assessments using advanced diagnostic technology to detect conditions early and maintain optimal vision.",
    icon: "eye",
    image: "/stock Optometry machine.jpg",
  },
  {
    id: "contact-lenses",
    title: "Contact Lens Fitting",
    shortTitle: "Contact Lenses",
    description:
      "Expert fitting and ongoing care for all types of contact lenses, from daily disposables to specialty lenses for astigmatism and multifocal needs.",
    icon: "lens",
    image: "/stock contact lense on finger.jpg",
  },
  {
    id: "prescription-glasses",
    title: "Prescription Eyeglasses",
    shortTitle: "Eyeglasses",
    description:
      "A curated collection of designer and affordable frames paired with precision-crafted lenses tailored to your prescription and lifestyle.",
    icon: "glasses",
    image: "/stock eyewear 2.jpg",
  },
  {
    id: "lens-coatings",
    title: "Lens Types & Coatings",
    shortTitle: "Lens Coatings",
    description:
      "Anti-reflective, blue-light filtering, photochromic, and scratch-resistant coatings to enhance your visual comfort and lens durability.",
    icon: "shield",
    image: "/stock tommy hilfiger eyewear.jpg",
  },
  {
    id: "pediatric",
    title: "Pediatric Eye Care",
    shortTitle: "Kids Eye Care",
    description:
      "Specialised eye examinations for children to ensure healthy visual development and early detection of vision problems that can affect learning.",
    icon: "child",
    image: "/stock child glasses.jpg",
  },
  {
    id: "drivers-licence",
    title: "Driver's Licence Eye Test",
    shortTitle: "Driver's Licence",
    description:
      "Quick and professional eye tests for driver's licence applications and renewals, including day and night vision certificates.",
    icon: "car",
    image: "/stock drivers eye test.webp",
  },
] as const;

// Note: PROMO_BANNERS, TESTIMONIALS, and FAQ_ITEMS are now managed in Supabase
// database and fetched dynamically on pages that need them
