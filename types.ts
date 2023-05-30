// API
type ProductType = string; // would ordinarily elaborate these, e.g, "Hard Good" | "etc";
type ProductImage = {
  id: number;
  public_id: string;
  imageSrc: string;
  product: productData;
  productId: number;
};

export type productData = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: ProductImage[];
  created_at: string;
};

export type ShopApiData = {
  product:productData [];
};

// State

export type ProductState = productData & {
  quantity?: number;
};

export type ItemsInCart = {
  [id: productData["id"]]: number;
};
