
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductGrid from './ProductGrid';
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import AiRecommendations from '../ai/AiRecommendations';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            Browse All Products
          </Button>
        </Card>
      </div>
    );
  }

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity} ${quantity === 1 ? 'item' : 'items'}) has been added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Get related products (same category but different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain aspect-square"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : index < product.rating
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-muted-foreground">
                {product.rating.toFixed(1)} rating
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">{formattedPrice}</div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm">
              {product.category}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={handleAddToCart}
            className="w-full md:w-auto"
            variant="secondary"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      <div className="mt-16">
        <AiRecommendations currentProductId={product.id} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={relatedProducts} title="Related Products" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
