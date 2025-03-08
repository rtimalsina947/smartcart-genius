
import { useStore } from '@/contexts/StoreContext';
import ProductGrid from '@/components/products/ProductGrid';
import Chatbot from '@/components/ai/Chatbot';

const Products = () => {
  const { products } = useStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-muted-foreground mb-8">
        Browse our complete collection of high-quality products.
      </p>
      
      <ProductGrid products={products} />
      <Chatbot />
    </div>
  );
};

export default Products;
