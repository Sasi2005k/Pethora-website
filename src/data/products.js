const WA = "https://wa.me/918903557852";
const IG = "https://www.instagram.com/pethora_womenswear?igsh=MTYxaXAwYWNxd21kaA==";

// ─── SAREES (10 slots) ────────────────────────────────────────────────────────
export const products = [
  {
    id: 1,
    title: "Spay Silk Saree",
    price: 899,
    category: "Silk",
    images: ["/images/spay1.jpg", "/images/spay2.jpg"],
    colors: [
      { name: "Teal",       hex: "#4ECDC4", imageIdx: 0 },
      { name: "Royal Blue", hex: "#1a3e8a", imageIdx: 1 }
    ],
    whatsapp: WA, instagram: IG
  },
  {
    id: 2,
    title: "Bahurani Silk Saree",
    price: 949,
    category: "Silk",
    images: ["/images/bahurani1.jpg", "/images/bahurani2.jpg"],
    colors: [{ name: "White", hex: "#FFFFFF", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 3,
    title: "Dola Saree",
    price: 449,
    category: "Silk",
    images: ["/images/dola1.jpg", "/images/dola2.jpg"],
    colors: [
      { name: "Light Green", hex: "#90EE90", imageIdx: 0 },
      { name: "Blue",        hex: "#004F98", imageIdx: 1 }
    ],
    whatsapp: WA, instagram: IG
  },
  {
    id: 4,
    title: "Vali Cotton Saree",
    price: 430,
    category: "Cotton",
    images: ["/images/vali1.jpg", "/images/vali2.jpg"],
    colors: [
      { name: "Light Blue",   hex: "#ADD8E6", imageIdx: 0 },
      { name: "Light Orange", hex: "#FFA500", imageIdx: 1 }
    ],
    whatsapp: WA, instagram: IG
  },
  {
    id: 5,
    title: "Janki Saree",
    price: 749,
    category: "Silk",
    images: ["/images/janki1.jpg", "/images/janki2.jpg"],
    colors: [
      { name: "Green",  hex: "#2E8B57", imageIdx: 0 },
      { name: "Purple", hex: "#800080", imageIdx: 1 }
    ],
    whatsapp: WA, instagram: IG
  },
  {
    id: 6,
    title: "Cotton Saree",
    price: 430,
    category: "Cotton",
    images: ["/images/cotton1.jpg", "/images/cotton2.jpg"],
    colors: [
      { name: "Light Green", hex: "#98FB98", imageIdx: 0 },
      { name: "Black",       hex: "#1a1a1a", imageIdx: 1 }
    ],
    whatsapp: WA, instagram: IG
  },
  {
    id: 7,
    title: "Tamil Font Saree",
    price: 499,
    category: "Cotton",
    images: ["/images/tamilfont1.jpg"],
    colors: [{ name: "Pink", hex: "#FFB6C1", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 8,
    title: "Umbrella Saree",
    price: 499,
    category: "Cotton",
    images: ["/images/umbrella1.jpg"],
    colors: [{ name: "Sky Blue", hex: "#87CEEB", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 9,
    title: "Jyothika Silk Saree",
    price: 550,
    category: "Silk",
    images: ["/images/jyothika1.jpg"],
    colors: [{ name: "Teal", hex: "#008080", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 10,
    title: "Digital Saree",
    price: 649,
    category: "Fancy",
    images: ["/images/saree10.jpg"],
    colors: [{ name: "Digital Print", hex: "#E74C3C", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 11,
    title: "Butterfly Saree",
    price: 749,
    category: "Fancy",
    images: ["/images/saree11.jpg"],
    colors: [{ name: "Butterfly", hex: "#3498DB", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 12,
    title: "Saffron Fancy Saree",
    price: 899,
    category: "Fancy",
    images: ["/images/saree12.jpg"],
    colors: [{ name: "Saffron", hex: "#F4C430", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 13,
    title: "Royal Fancy Saree",
    price: 1299,
    category: "Silk",
    images: ["/images/saree13.jpg"],
    colors: [{ name: "Royal", hex: "#4169E1", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 14,
    title: "Kongunadu Cotton Saree",
    price: 2999,
    category: "Cotton",
    images: ["/images/saree14.jpg"],
    colors: [{ name: "Cotton", hex: "#F5DEB3", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: 15,
    title: "Mulmul Cotton Saree",
    price: 699,
    category: "Cotton",
    images: ["/images/saree15.jpg"],
    colors: [{ name: "Mulmul", hex: "#FFFAFA", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  }
];

// ─── KURTHI & LEGGINGS (6 products) ──────────────────────────────────────────
// Drop images in public/images/ using the filenames in the images[] array
export const kurthiProducts = [
  {
    id: "k1",
    title: "Umbrella Kalamkari Kurthi",
    price: "549–599",
    category: "Kurthi",
    images: ["/images/kurti1.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "k2",
    title: "Kurthi with Leggings",
    price: 299,
    category: "Kurthi",
    images: ["/images/kurti2.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "k3",
    title: "Normal Kurthi 3-Piece Set",
    price: "549–599",
    category: "Kurthi",
    images: ["/images/kurti3.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "k4",
    title: "Side-Open Kurthi",
    price: 449,
    category: "Kurthi",
    images: ["/images/kurti4.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "k5",
    title: "Palazzo Pant Set",
    price: 349,
    category: "Kurthi",
    images: ["/images/kurti5.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "k6",
    title: "Straight Pant Set",
    price: 249,
    category: "Kurthi",
    images: ["/images/kurti6.jpg"],
    whatsapp: WA, instagram: IG
  },
];

// ─── NIGHTY / WOMEN SLEEPWEAR (3 products) ───────────────────────────────────
// Drop images in public/images/ using the filenames in the images[] array
export const nightyProducts = [
  {
    id: "n1",
    title: "Normal Nighty",
    price: 299,
    category: "Nighty",
    images: ["/images/nighty1.jpg"],
    colors: [{ name: "Assorted", hex: "#F8C8D4", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: "n2",
    title: "Maternity Feeding Nighty",
    price: 369,
    category: "Nighty",
    images: ["/images/nighty2.jpg"],
    colors: [{ name: "Assorted", hex: "#AED6F1", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
  {
    id: "n3",
    title: "Maternity Non-Feeding Nighty",
    price: 349,
    category: "Nighty",
    images: ["/images/nighty3.jpg"],
    colors: [{ name: "Assorted", hex: "#A9DFBF", imageIdx: 0 }],
    whatsapp: WA, instagram: IG
  },
];

// ─── JEWELLERY (8 products) ───────────────────────────────────
export const jewelleryProducts = [
  {
    id: "j1",
    title: "Impon Kamal",
    price: 330,
    category: "Jewellery",
    images: ["/images/jewelry1.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j2",
    title: "Normal Kamal",
    price: 30,
    category: "Jewellery",
    images: ["/images/jewelry2.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j3",
    title: "Jhumka Kammal",
    price: 99,
    category: "Jewellery",
    images: ["/images/jewelry3.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j4",
    title: "Lakshmi Kamal",
    price: 99,
    category: "Jewellery",
    images: ["/images/jewelry4.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j5",
    title: "Fancy Kamal",
    price: 80,
    category: "Jewellery",
    images: ["/images/jewelry5.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j6",
    title: "Silver Kamal",
    price: 35,
    category: "Jewellery",
    images: ["/images/jewelry6.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j7",
    title: "Color Gold & Silver (For Rent)",
    price: 1000,
    category: "Jewellery",
    images: ["/images/jewelry7.jpg"],
    whatsapp: WA, instagram: IG
  },
  {
    id: "j8",
    title: "Imitation Jewellery",
    price: 1750,
    category: "Jewellery",
    images: ["/images/jewelry8.jpg"],
    whatsapp: WA, instagram: IG
  }
];
