import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Calendar as CalendarIcon,
  User,
  Car,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Booking } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const services = [
  { value: 'nova-care-exterieur', label: 'Nova Care Extérieur - 24,99€' },
  { value: 'nova-care-interieur', label: 'Nova Care Intérieur - 24,99€' },
  { value: 'nova-care-complet', label: 'Nova Care Complet - 44,99€' },
  { value: 'nova-premium-interieur', label: 'Nova Premium Intérieur - 49,99€' },
  { value: 'nova-premium-exterieur', label: 'Nova Premium Extérieur - 49,99€' },
  { value: 'nova-premium-complet', label: 'Nova Premium Complet - 79,99€' },
  { value: 'abonnement-care', label: 'Abonnement Mensuel Care - 39,99€/mois' },
  { value: 'abonnement-premium', label: 'Abonnement Nova Premium - 69,99€/mois' },
  { value: 'abonnement-showroom', label: 'Abonnement Nova Showroom - 149,99€/mois' },
];

const vehicleTypes = [
  'Citadine',
  'Berline',
  'SUV / 4x4',
  'Coupé / Cabriolet',
  'Break',
  'Utilitaire',
  'Moto',
  'Autre',
];

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  vehicle_type: string;
  service: string;
  preferred_date: string;
  comment: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  vehicle_type?: string;
  service?: string;
  preferred_date?: string;
}

const initialFormData: FormData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  address: '',
  vehicle_type: '',
  service: '',
  preferred_date: '',
  comment: '',
};

export default function Booking() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'Le prénom est requis';
    if (!formData.last_name.trim()) newErrors.last_name = 'Le nom est requis';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9\s+.-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.vehicle_type) newErrors.vehicle_type = 'Sélectionnez un type de véhicule';
    if (!formData.service) newErrors.service = 'Sélectionnez un service';
    if (!selectedDate) newErrors.preferred_date = 'Sélectionnez une date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatDateForDB = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedDate) return;

    setIsSubmitting(true);

    try {
      const bookingData: Omit<Booking, 'id' | 'created_at'> = {
        ...formData,
        preferred_date: formatDateForDB(selectedDate),
        status: 'pending',
      };

      if (supabase) {
        const { error } = await supabase.from('bookings').insert([bookingData]);

        if (error) throw error;
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      setSelectedDate(null);
    } catch (err) {
      console.error('Erreur lors de la réservation:', err);
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
    const days = [];
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date < today || dayOfWeek === 0;
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setErrors((prev) => ({ ...prev, preferred_date: undefined }));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Réservation confirmée !
            </h2>
            <p className="text-gray-600 mb-8">
              Merci pour votre confiance ! Nous vous contacterons très prochainement
              pour confirmer votre rendez-vous.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-outline"
            >
              Nouvelle réservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <CalendarIcon className="w-4 h-4 text-sport-500" />
            <span className="text-sm text-white/90">Réservation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            RÉSERVER MAINTENANT
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Réservez votre prestation de detailing en quelques clics
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form Fields */}
              <div className="lg:col-span-3 space-y-6">
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-sport-500" />
                    Vos informations
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`input-field ${errors.first_name ? 'input-error' : ''}`}
                        placeholder="Votre prénom"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.first_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`input-field ${errors.last_name ? 'input-error' : ''}`}
                        placeholder="Votre nom"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.last_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input-field ${errors.phone ? 'input-error' : ''}`}
                        placeholder="06 12 34 56 78"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field ${errors.email ? 'input-error' : ''}`}
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`input-field ${errors.address ? 'input-error' : ''}`}
                      placeholder="123 Rue Example, 06000 Nice"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      Service à domicile - nous nous déplaçons chez vous
                    </p>
                  </div>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <Car className="w-5 h-5 text-sport-500" />
                    Votre véhicule
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de véhicule *
                      </label>
                      <select
                        name="vehicle_type"
                        value={formData.vehicle_type}
                        onChange={handleInputChange}
                        className={`input-field ${errors.vehicle_type ? 'input-error' : ''}`}
                      >
                        <option value="">Sélectionnez un type</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.vehicle_type && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.vehicle_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service souhaité *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`input-field ${errors.service ? 'input-error' : ''}`}
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.service}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card p-8">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sport-500" />
                    Commentaire (optionnel)
                  </h3>

                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field"
                    placeholder="Informations supplémentaires, demandes spéciales..."
                  />
                </div>
              </div>

              {/* Calendar & Summary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6 sticky top-28">
                  <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-sport-500" />
                    Choisissez une date
                  </h3>

                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="font-semibold text-navy-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Calendar Days Header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square p-1 ${
                          day
                            ? isDateDisabled(day)
                              ? 'text-gray-300 cursor-not-allowed'
                              : selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() === currentMonth.getMonth()
                              ? 'bg-sport-500 text-white rounded-lg cursor-pointer'
                              : 'text-navy-900 hover:bg-sport-500/10 rounded-lg cursor-pointer'
                            : ''
                        } flex items-center justify-center text-sm transition-colors`}
                        onClick={() => day && !isDateDisabled(day) && handleDateSelect(day)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {errors.preferred_date && (
                    <p className="text-red-500 text-sm mt-4 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.preferred_date}
                    </p>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500 space-y-2">
                      <p>• Dimanches non disponibles</p>
                      <p>• Confirmation sous 24h</p>
                      <p>• Service à domicile inclus</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-6 btn-primary flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer la réservation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
