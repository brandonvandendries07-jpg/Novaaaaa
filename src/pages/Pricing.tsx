import { Check, Sparkles, Crown, Zap } from 'lucide-react';
import type { Page, PricingCard } from '../types';

interface PricingProps {
  navigateTo: (page: Page) => void;
}

const carePackages: PricingCard[] = [
  {
    id: 'care-exterieur',
    name: 'Nova Care Extérieur',
    type: 'care',
    price: 24.99,
    features: [
      'Lavage carrosserie',
      'Nettoyage jantes',
      'Vitres extérieures',
    ],
  },
  {
    id: 'care-interieur',
    name: 'Nova Care Intérieur',
    type: 'care',
    price: 24.99,
    features: [
      'Aspiration complète',
      'Dépoussiérage',
      'Nettoyage plastiques',
    ],
  },
  {
    id: 'care-complet',
    name: 'Nova Care Complet',
    type: 'care',
    price: 44.99,
    popular: true,
    features: [
      'Intérieur + Extérieur',
      'Lavage et aspiration',
      'Nettoyage complet',
    ],
  },
];

const premiumPackages: PricingCard[] = [
  {
    id: 'premium-interieur',
    name: 'Nova Premium Intérieur',
    type: 'premium',
    price: 49.99,
    features: [
      'Nettoyage approfondi',
      'Shampoing sièges',
      'Plastiques détaillés',
    ],
  },
  {
    id: 'premium-exterieur',
    name: 'Nova Premium Extérieur',
    type: 'premium',
    price: 49.99,
    features: [
      'Décontamination légère',
      'Jantes détaillées',
      'Finition brillante',
    ],
  },
  {
    id: 'premium-complet',
    name: 'Nova Premium Complet',
    type: 'premium',
    price: 79.99,
    popular: true,
    features: [
      'Intérieur + Extérieur premium',
      'Nettoyage approfondi',
      'Finitions supérieures',
    ],
  },
];

const subscriptionPackages: PricingCard[] = [
  {
    id: 'abonnement-premium',
    name: 'Nova Premium',
    type: 'subscription',
    price: 69.99,
    features: [
      '1 nettoyage intérieur + extérieur / mois',
      'Nettoyage plus poussé',
      'Tapis et surfaces traités',
      'Finition supérieure',
      'Priorité planning',
      '-20% sur options',
    ],
  },
  {
    id: 'abonnement-showroom',
    name: 'Nova Showroom',
    type: 'subscription',
    price: 149.99,
    popular: true,
    features: [
      '1 prestation showroom / mois',
      'Nettoyage complet',
      'Extraction sièges/tapis selon besoin',
      'Vapeur',
      'Finitions premium',
      'Priorité absolue',
    ],
  },
];

const monthlyPackage: PricingCard = {
  id: 'abonnement-care',
  name: 'Abonnement Mensuel',
  type: 'subscription',
  description: 'Nova Care Complet - 1 passage par mois',
  price: 39.99,
  features: [
    'Nova Care Complet',
    '1 passage par mois',
    'Prix avantageux',
    'Priorité de réservation',
  ],
};

function PricingCardComponent({
  card,
  navigateTo,
}: {
  card: PricingCard;
  navigateTo: (page: Page) => void;
}) {
  const getIcon = () => {
    if (card.type === 'care') return <Zap className="w-6 h-6" />;
    if (card.type === 'premium') return <Sparkles className="w-6 h-6" />;
    return <Crown className="w-6 h-6" />;
  };

  const getBorderColor = () => {
    if (card.popular) return 'border-sport-500 ring-2 ring-sport-500/20';
    return 'border-gray-100';
  };

  return (
    <div
      className={`card p-8 relative ${getBorderColor()} hover:border-sport-500/50 transition-all duration-300`}
    >
      {card.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sport-500 text-white text-sm font-semibold rounded-full">
          Populaire
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            card.type === 'care'
              ? 'bg-blue-100 text-blue-600'
              : card.type === 'premium'
              ? 'bg-purple-100 text-purple-600'
              : 'bg-gradient-to-br from-sport-500 to-sport-600 text-white'
          }`}
        >
          {getIcon()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy-900">{card.name}</h3>
          {card.description && (
            <p className="text-sm text-gray-500">{card.description}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-navy-900">
          {card.price.toFixed(2).replace('.', ',')}€
        </span>
        {card.type === 'subscription' && (
          <span className="text-gray-500 ml-2">/mois</span>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {card.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigateTo('booking')}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          card.popular
            ? 'bg-sport-500 text-white hover:bg-sport-600'
            : 'bg-navy-900 text-white hover:bg-navy-800'
        }`}
      >
        Choisir
      </button>
    </div>
  );
}

export default function Pricing({ navigateTo }: PricingProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-sport-500" />
            <span className="text-sm text-white/90">Nos tarifs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            TARIFS TRANSPARENTS
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Des formules adaptées à tous les besoins et tous les budgets
          </p>
        </div>
      </section>

      {/* Nova Care Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              <Zap className="w-8 h-8 inline-block mr-2 text-blue-500" />
              Nova Care
            </h2>
            <p className="text-gray-600">
              Nettoyage express pour un entretien régulier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {carePackages.map((card) => (
              <PricingCardComponent key={card.id} card={card} navigateTo={navigateTo} />
            ))}
          </div>
        </div>
      </section>

      {/* Nova Premium Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              <Sparkles className="w-8 h-8 inline-block mr-2 text-purple-500" />
              Nova Premium
            </h2>
            <p className="text-gray-600">
              Nettoyage approfondi pour un résultat impeccable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premiumPackages.map((card) => (
              <PricingCardComponent key={card.id} card={card} navigateTo={navigateTo} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section className="py-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <Crown className="w-8 h-8 inline-block mr-2 text-sport-500" />
              Abonnements Mensuels
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Maintenez votre véhicule impeccable toute l'année avec nos formules d'abonnement
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Monthly Basic */}
            <div className="card p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy-900 mb-1">{monthlyPackage.name}</h3>
                <p className="text-sm text-gray-500">{monthlyPackage.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy-900">
                  {monthlyPackage.price.toFixed(2).replace('.', ',')}€
                </span>
                <span className="text-gray-500 ml-2">/mois</span>
              </div>
              <ul className="space-y-3 mb-8">
                {monthlyPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigateTo('booking')}
                className="w-full py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors"
              >
                Choisir
              </button>
            </div>

            {/* Premium & Showroom Subscriptions */}
            {subscriptionPackages.map((card) => (
              <div
                key={card.id}
                className={`card p-8 relative ${
                  card.popular
                    ? 'bg-gradient-to-br from-sport-500 to-sport-600 text-white border-none'
                    : ''
                }`}
              >
                {card.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-navy-900 text-white text-sm font-semibold rounded-full">
                    Meilleure valeur
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-1 ${card.popular ? 'text-white' : 'text-navy-900'}`}>
                    {card.name}
                  </h3>
                </div>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${card.popular ? 'text-white' : 'text-navy-900'}`}>
                    {card.price.toFixed(2).replace('.', ',')}€
                  </span>
                  <span className={card.popular ? 'text-white/80' : 'text-gray-500'}> /mois</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${card.popular ? 'text-white' : 'text-green-500'}`} />
                      <span className={card.popular ? 'text-white/90' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigateTo('booking')}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    card.popular
                      ? 'bg-white text-sport-500 hover:bg-gray-100'
                      : 'bg-navy-900 text-white hover:bg-navy-800'
                  }`}
                >
                  Choisir
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-gray-600 mb-8">
            Contactez-nous pour un devis personnalisé adapté à votre véhicule et vos besoins
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigateTo('booking')} className="btn-primary">
              Réserver maintenant
            </button>
            <a href="tel:0493921474" className="text-navy-900 font-semibold hover:text-sport-500 transition-colors">
              ou appelez : 04 93 92 14 74
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
