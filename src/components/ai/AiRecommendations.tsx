
import { useEffect, useState } from 'react';
import { useStore, Product } from '@/contexts/StoreContext';
import ProductCard from '../products/ProductCard';
import { Skeleton } from "@/components/ui/skeleton";

interface AiRecommendationsProps {
  currentProductId?: string;
  limit?: number;
}

const AiRecommendations = ({ currentProductId, limit = 4 }: AiRecommendationsProps) => {
  const { products } = useStore();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendation process
    setIsLoading(true);
    
    setTimeout(() => {
      // For demo, filter out current product and randomly select products
      const filteredProducts = currentProductId 
        ? products.filter(p => p.id !== currentProductId)
        : products;
      
      // Shuffle array and take the first 'limit' items
      const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffled.slice(0, limit);
      
      setRecommendations(selectedProducts);
      setIsLoading(false);
    }, 1500);
  }, [products, currentProductId, limit]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">AI Recommendations</h2>
      <p className="text-muted-foreground mb-6">
        Based on your browsing history and preferences, you might also like:
      </p>
      
      {isLoading ? (
        <div className="product-grid">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="w-full h-48 sm:h-64 rounded-md" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-4 rounded" />
              <Skeleton className="w-1/4 h-4 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="product-grid">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AiRecommendations;
