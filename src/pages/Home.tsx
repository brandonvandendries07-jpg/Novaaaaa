import { useEffect, useState, useRef } from 'react';
import {
  Sparkles,
  Shield,
  Award,
  Truck,
  Heart,
  ChevronRight,
  Star,
  ArrowRight,
} from 'lucide-react';
import type { Page, Testimonial, Stat } from '../types';

interface HomeProps {
  navigateTo: (page: Page) => void;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marc D.',
    vehicle: 'BMW Série 3',
    service: 'Nova Premium Complet',
    rating: 5,
    comment: 'Un travail exceptionnel ! Ma voiture est comme neuve. Le service à domicile est très pratique. Je recommande vivement.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Sophie L.',
    vehicle: 'Mercedes Classe A',
    service: 'Nova Care Complet',
    rating: 5,
    comment: 'Équipe professionnelle et résultat impeccable. Les sièges en cuir sont resplendissants. Merci Nova Detail !',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Thomas R.',
    vehicle: 'Audi A4',
    service: 'Nova Premium Extérieur',
    rating: 5,
    comment: 'Le polissage a supprimé tous les micro-rayures. La voiture brille comme au premier jour. Service au top !',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const stats: Stat[] = [
  { value: 1500, suffix: '+', label: 'Véhicules traités' },
  { value: 98, suffix: '%', label: 'Clients satisfaits' },
  { value: 4.9, suffix: '/5', label: 'Note moyenne' },
  { value: 5, suffix: ' ans', label: 'D\'expérience' },
];

const features = [
  {
    icon: Sparkles,
    title: 'Produits professionnels',
    description: 'Nous utilisons uniquement des produits de qualité professionnelle, respectueux de votre véhicule.',
  },
  {
    icon: Award,
    title: 'Résultat haut de gamme',
    description: 'Finitions impeccables dignes des plus grandes marques automobiles.',
  },
  {
    icon: Truck,
    title: 'Service à domicile',
    description: 'Nous nous déplaçons chez vous avec tout notre équipement professionnel.',
  },
  {
    icon: Heart,
    title: 'Satisfaction garantie',
    description: 'Votre satisfaction est notre priorité. Nous ne partons pas tant que vous n\'êtes pas ravi.',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl lg:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
    </div>
  );
}

export default function Home({ navigateTo }: HomeProps) {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-slide-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-sport-500" />
              <span className="text-sm text-white/90">Detailing automobile premium</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            Nova Detail
          </h1>

          <p className="text-xl sm:text-2xl text-white/80 mb-4 font-light animate-fade-in animate-delay-200">
            La perfection dans chaque détail.
          </p>

          <p className="max-w-2xl mx-auto text-white/60 mb-12 animate-fade-in animate-delay-300">
            Votre véhicule mérite le meilleur. Service de detailing automobile professionnel
            à domicile avec des produits haut de gamme et un résultat impeccable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-400">
            <button
              onClick={() => navigateTo('booking')}
              className="btn-primary text-lg px-8 py-4 group"
            >
              Réserver maintenant
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Voir nos réalisations
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-6">
                Bienvenue chez <span className="text-gradient">Nova Detail</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Passionnés par l'automobile et les belles finitions, nous mettons notre expertise
                au service de votre véhicule. Avec plus de 5 ans d'expérience dans le detailing,
                nous avons développé des techniques et des protocoles pour obtenir des résultats
                dignes des concours d'élégance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Que vous possédiez une citadine, un SUV ou une voiture de luxe, nous traitons
                chaque véhicule avec le même soin et la même attention aux détails. Notre
                service à domicile vous permet de profiter d'un résultat professionnel sans
                vous déplacer.
              </p>
              <button
                onClick={() => navigateTo('pricing')}
                className="btn-outline group"
              >
                Découvrir nos tarifs
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Detailing professionnel"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-navy-900 text-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-sport-500" />
                  <div>
                    <p className="font-semibold">Garantie satisfaction</p>
                    <p className="text-sm text-gray-400">ou nous revenons gratuitement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Pourquoi nous choisir ?</h2>
            <p className="section-subtitle mx-auto">
              Des prestations haut de gamme pour votre véhicule
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sport-500 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sport-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sport-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Nova Detail en chiffres
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des chiffres qui témoignent de notre engagement et de la confiance de nos clients
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Ce que disent nos clients</h2>
            <p className="section-subtitle mx-auto">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="card card-hover p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-navy-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.vehicle} • {testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy-900/80" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Prêt à sublimer votre véhicule ?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Réservez votre prestation dès maintenant et offrez à votre voiture
            le soin qu'elle mérite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('booking')}
              className="btn-primary text-lg px-10 py-4 group"
            >
              Réserver maintenant
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:0493921474"
              className="flex items-center gap-2 text-white hover:text-sport-500 transition-colors"
            >
              <span className="text-lg">ou appelez-nous : 04 93 92 14 74</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
