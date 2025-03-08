
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Smart Shopping, <span className="text-primary">AI-Powered</span> Recommendations
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover products tailored just for you with our cutting-edge AI technology that learns your preferences and delivers personalized shopping experiences.
        </p>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="What are you looking for?"
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
          <Button variant="outline" onClick={() => navigate('/categories')}>
            Explore Categories
          </Button>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Clothing', 'Home', 'Accessories'].map((category) => (
              <div
                key={category}
                onClick={() => navigate(`/categories/${category.toLowerCase()}`)}
                className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-medium">{category}</h3>
                <ArrowRight className="h-4 w-4 mt-2 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
