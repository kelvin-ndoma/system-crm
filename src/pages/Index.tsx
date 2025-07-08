import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MapPin, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const houses = [
    {
      id: 'kenya',
      name: 'HQ House Kenya',
      location: 'Nairobi, Kenya',
      description: 'Nairobi\'s premier co-working space for ambitious professionals',
      members: 156,
      image: '/placeholder.svg'
    },
    {
      id: 'dc',
      name: 'HQ House DC',
      location: 'Washington DC, USA',
      description: 'Premium workspace in the heart of the capital for policy makers and entrepreneurs',
      members: 89,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground">
              HQ House
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Premium co-working spaces designed for the world's most ambitious professionals and entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/kenya">
                  Explore Kenya Location
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dc">
                  Explore DC Location
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Locations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our premium co-working spaces around the world, each designed to foster innovation and collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {houses.map((house) => (
              <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <img 
                    src={house.image} 
                    alt={house.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{house.name}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{house.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{house.members} members</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {house.description}
                  </CardDescription>
                  <Button asChild className="w-full">
                    <Link to={`/${house.id}`}>
                      Explore Location
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">About HQ House</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Founded by The Burns Brothers, HQ House represents the future of premium co-working. 
              We create spaces where innovation meets opportunity, connecting ambitious professionals 
              across the globe in environments designed for success.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Premium Spaces</h3>
                <p className="text-muted-foreground">
                  Thoughtfully designed environments that inspire creativity and productivity.
                </p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Community</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded professionals and entrepreneurs worldwide.
                </p>
              </div>
              <div className="text-center">
                <ArrowRight className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growth Focused</h3>
                <p className="text-muted-foreground">
                  Resources and support to help you and your business reach new heights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
