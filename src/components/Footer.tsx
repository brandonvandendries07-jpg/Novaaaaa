import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import type { Page } from '../types';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sport-500 to-sport-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-display font-bold">Nova Detail</span>
                <p className="text-xs text-gray-400 mt-0.5">La perfection dans chaque détail</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Service de detailing automobile premium. Nous transformons votre véhicule avec expertise et passion.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { page: 'home' as Page, label: 'Accueil' },
                { page: 'gallery' as Page, label: 'Nos réalisations' },
                { page: 'pricing' as Page, label: 'Tarifs' },
                { page: 'booking' as Page, label: 'Réservation' },
              ].map(({ page, label }) => (
                <li key={page}>
                  <button
                    onClick={() => navigateTo(page)}
                    className="text-gray-400 hover:text-sport-500 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0493921474"
                  className="flex items-center gap-3 text-gray-400 hover:text-sport-500 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-sport-500 group-hover:scale-110 transition-transform" />
                  <span>04 93 92 14 74</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@novadetail.fr"
                  className="flex items-center gap-3 text-gray-400 hover:text-sport-500 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-sport-500 group-hover:scale-110 transition-transform" />
                  <span>contact@novadetail.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-sport-500 flex-shrink-0 mt-0.5" />
                <span>Service à domicile<br />Côte d'Azur et environs</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Suivez-nous</h4>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-sport-500 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Découvrez nos réalisations et actualités sur les réseaux sociaux.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Nova Detail. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigateTo('home')}
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
              >
                Mentions légales
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
              >
               Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
