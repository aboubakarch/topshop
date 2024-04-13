interface Search {
  onSearch: (val: string) => void;
}

interface Filter {
  onFilter: (cat: string) => void;
}

interface Product {
  id: string;
  index: number;
  rating: number;
  promotion: 'gift' | 'discount' | '1+1' | null;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
}

interface ProductCard {
  data: Product;
}

interface InfoChip {
  isRating?: boolean;
  isNew?: boolean;
  info: string | number;
}

interface Category {
  id: string;
  name: string;
}

interface PromoChip {
  promotion: 'gift' | 'discount' | '1+1';
}
