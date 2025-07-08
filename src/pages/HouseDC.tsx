import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Users, Wifi, Coffee, Calendar, Star, Building2 } from 'lucide-react';
import ApplicationForm from '@/components/ApplicationForm';

const HouseDC = () => {
  const membershipTypes = [
    {
      id: '1',
      name: 'Entrepreneur',
      description: 'Perfect for startup founders and solo entrepreneurs',
      monthlyPrice: 450,
      initiationFee: 150,
      features: ['24/7 Access', 'High-Speed WiFi', 'Printing Services', 'Networking Events'],
      popular: false
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Ideal for consultants and growing businesses',
      monthlyPrice: 750,
      initiationFee: 300,
      features: ['All Entrepreneur Benefits', 'Meeting Room Access', 'Mail Handling', 'Priority Support'],
      popular: true
    },
    {
      id: '3',
      name: 'Executive',
      description: 'Premium experience for established leaders',
      monthlyPrice: 1200,
      initiationFee: 500,
      features: ['All Professional Benefits', 'Private Office Access', 'Guest Passes', 'Concierge Service'],
      popular: false
    }
  ];

  const benefits = [
    { icon: Building2, title: 'Prime Location', description: 'Heart of Washington DC business district' },
    { icon: Wifi, title: 'Enterprise WiFi', description: 'Ultra-fast connectivity for all your needs' },
    { icon: Coffee, title: 'Premium Amenities', description: 'Gourmet coffee, tea, and refreshments' },
    { icon: Calendar, title: 'Executive Events', description: 'High-level networking and learning opportunities' }
  ];

  const testimonials = [
    {
      name: 'Michael Thompson',
      title: 'Policy Consultant',
      content: 'HQ House DC provides the perfect environment for high-stakes consulting work. The professional atmosphere is unmatched.',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      title: 'Tech Entrepreneur',
      content: 'Being in the heart of DC while having access to world-class facilities has been game-changing for my startup.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-red-500/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            HQ House <span className="text-blue-600">DC</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Washington DC's premier co-working space for policy makers, entrepreneurs, 
            and business leaders shaping America's future.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="text-lg">Downtown Washington, DC</span>
          </div>
          <Button size="lg" className="text-lg px-8 py-3" onClick={() => document.getElementById('apply')?.scrollIntoView()}>
            Join Our Community
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose HQ House DC?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than just a workspace - we're building Washington DC's most influential 
              professional community where policy meets innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Membership Plans</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your professional needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipTypes.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-600 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    + ${plan.initiationFee} one-time setup fee
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Members Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-blue-600 text-blue-600" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Ready to Join HQ House DC?</h2>
            <p className="text-xl text-muted-foreground">
              Fill out our application form and become part of Washington DC's most influential workspace community.
            </p>
          </div>
          
          <ApplicationForm houseId="dc" membershipTypes={membershipTypes} />
        </div>
      </section>
    </div>
  );
};

export default HouseDC;
