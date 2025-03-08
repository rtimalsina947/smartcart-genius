
import { Link } from 'react-router-dom';
import { useStore, Product } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <Card className="overflow-hidden card-hover">
      <Link to={`/products/${product.id}`}>
        <div className="overflow-hidden h-48 sm:h-64">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : index < product.rating
                  ? 'text-yellow-400 fill-yellow-400 opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <Link to={`/products/${product.id}`} className="block group">
          <h3 className="font-medium text-lg truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="mt-2 text-lg font-bold">{formattedPrice}</div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          variant="secondary"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
