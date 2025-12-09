export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  tagline: string;
  color: string;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  location: string;
}

export type BeadType = {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  scale: number;
};

// Global declaration for React Three Fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}