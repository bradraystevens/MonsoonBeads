
export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string; // Will default to "Bracelets"
  description: string; // Main emotional description
  poeticHeadline: string; // New: 1-line poetic intro
  emotionalBenefit: string; // New: "Feels like..."
  rating: number;
  isNew?: boolean;
  tagline?: string;
  color?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  location: string;
  date: string;
}

export interface BeadType {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  scale: number;
}

// Global declaration for React Three Fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}
