
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, isAuthenticated } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    
    // Simulate a checkout process
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Your order is being processed.",
      });
      clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation');
    }, 2000);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="w-full max-w-3xl mx-auto text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent className="pb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({cart.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {cart.map((item) => (
                  <li key={item.product.id} className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product Image */}
                      <Link 
                        to={`/products/${item.product.id}`}
                        className="w-24 h-24 flex-shrink-0 rounded overflow-hidden mb-4 sm:mb-0"
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      
                      {/* Product Info */}
                      <div className="sm:ml-6 flex-grow">
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.product.category}
                        </p>
                        
                        <div className="flex flex-wrap justify-between items-center mt-2">
                          <div className="font-bold">
                            {formatPrice(item.product.price)}
                          </div>
                          
                          <div className="flex items-center mt-2 sm:mt-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-md mr-4">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {/* Remove Button */}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                removeFromCart(item.product.id);
                                toast({
                                  title: "Item Removed",
                                  description: `${item.product.name} has been removed from your cart.`,
                                });
                              }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/products')}
                className="text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={() => {
                  clearCart();
                  toast({
                    title: "Cart Cleared",
                    description: "All items have been removed from your cart.",
                  });
                }}
                className="text-sm"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>{formatPrice(cartTotal * 0.08)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal + (cartTotal * 0.08))}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCheckout} 
                disabled={isProcessing}
                className="w-full"
                variant="secondary"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
