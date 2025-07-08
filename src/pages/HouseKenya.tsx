import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Users, Wifi, Coffee, Calendar, Star } from 'lucide-react';
import ApplicationForm from '@/components/ApplicationForm';

const HouseKenya = () => {
  const membershipTypes = [
    {
      id: '1',
      name: 'Co-Working',
      description: 'Perfect for freelancers and remote workers',
      monthlyPrice: 15000,
      initiationFee: 5000,
      features: ['24/7 Access', 'High-Speed WiFi', 'Printing Services', 'Community Events'],
      popular: false
    },
    {
      id: '2',
      name: 'Business',
      description: 'Ideal for growing businesses and teams',
      monthlyPrice: 25000,
      initiationFee: 10000,
      features: ['All Co-Working Benefits', 'Meeting Room Access', 'Mail Handling', 'Priority Support'],
      popular: true
    },
    {
      id: '3',
      name: 'Executive',
      description: 'Premium experience for established professionals',
      monthlyPrice: 45000,
      initiationFee: 15000,
      features: ['All Business Benefits', 'Private Phone Booth', 'Guest Passes', 'Concierge Service'],
      popular: false
    }
  ];

  const benefits = [
    { icon: Wifi, title: '24/7 High-Speed Internet', description: 'Reliable connectivity for all your work needs' },
    { icon: Coffee, title: 'Premium Amenities', description: 'Coffee, tea, and refreshments included' },
    { icon: Users, title: 'Vibrant Community', description: 'Network with like-minded professionals' },
    { icon: Calendar, title: 'Events & Workshops', description: 'Regular learning and networking opportunities' }
  ];

  const testimonials = [
    {
      name: 'Sarah Kimani',
      title: 'Tech Entrepreneur',
      content: 'HQ House Kenya has been instrumental in growing my startup. The community and resources are unmatched.',
      rating: 5
    },
    {
      name: 'David Ochieng',
      title: 'Freelance Designer',
      content: 'The perfect workspace with everything I need. Professional environment with a friendly community.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            HQ House <span className="text-primary">Kenya</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Nairobi's premier co-working space designed for ambitious professionals, 
            entrepreneurs, and innovators shaping Kenya's future.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-lg">Westlands, Nairobi</span>
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
            <h2 className="text-4xl font-bold mb-6">Why Choose HQ House Kenya?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than just a workspace - we're building Kenya's most dynamic 
              professional community where innovation meets opportunity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
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
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">KSh {plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    + KSh {plan.initiationFee.toLocaleString()} one-time setup fee
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
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
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
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
            <h2 className="text-4xl font-bold mb-6">Ready to Join HQ House Kenya?</h2>
            <p className="text-xl text-muted-foreground">
              Fill out our application form and become part of Kenya's most innovative workspace community.
            </p>
          </div>
          
          <ApplicationForm houseId="kenya" membershipTypes={membershipTypes} />
        </div>
      </section>
    </div>
  );
};

export default HouseKenya;
