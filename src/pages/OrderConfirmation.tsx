
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Thank you for your purchase. We've received your order and are processing it now.
          </p>
          
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">Order Number:</p>
            <p className="text-xl font-bold">{orderNumber}</p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </p>
          
          <div className="border border-muted p-4 rounded-md mt-6">
            <h3 className="font-medium mb-2">What's Next?</h3>
            <ul className="text-sm text-left space-y-2">
              <li className="flex">
                <span className="text-primary mr-2">1.</span>
                <span>We'll process your order within 24 hours.</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">2.</span>
                <span>You'll receive a shipping confirmation with tracking details.</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-2">3.</span>
                <span>Your order will be delivered within 3-5 business days.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={() => navigate('/products')} 
            className="w-full"
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/orders')} 
            className="w-full"
          >
            View My Orders
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
