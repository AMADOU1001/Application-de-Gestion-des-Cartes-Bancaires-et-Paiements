import React, { useState } from 'react';
import { PlusIcon, CalendarIcon, CreditCardIcon, AlertCircleIcon } from 'lucide-react';
// Mock data
const subscriptionsData = [{
  id: 1,
  service: 'Netflix',
  montant: 14.99,
  dateDebut: '2024-01-15',
  dateExpiration: '2025-01-15',
  logo: 'N',
  color: 'bg-red-100',
  textColor: 'text-red-600'
}, {
  id: 2,
  service: 'Spotify',
  montant: 9.99,
  dateDebut: '2024-02-10',
  dateExpiration: '2025-02-10',
  logo: 'S',
  color: 'bg-green-100',
  textColor: 'text-green-600'
}, {
  id: 3,
  service: 'Amazon Prime',
  montant: 6.99,
  dateDebut: '2024-03-05',
  dateExpiration: '2025-03-05',
  logo: 'A',
  color: 'bg-blue-100',
  textColor: 'text-blue-600'
}, {
  id: 4,
  service: 'Disney+',
  montant: 8.99,
  dateDebut: '2024-02-20',
  dateExpiration: '2025-02-20',
  logo: 'D+',
  color: 'bg-indigo-100',
  textColor: 'text-indigo-600'
}];
// Available services for subscription
const availableServices = [{
  id: 1,
  service: 'Netflix',
  description: 'Films, séries et documentaires en streaming',
  montant: 14.99,
  logo: 'N',
  color: 'bg-red-100',
  textColor: 'text-red-600'
}, {
  id: 2,
  service: 'Spotify',
  description: 'Musique en streaming sans publicité',
  montant: 9.99,
  logo: 'S',
  color: 'bg-green-100',
  textColor: 'text-green-600'
}, {
  id: 3,
  service: 'Amazon Prime',
  description: 'Livraison gratuite et Prime Video',
  montant: 6.99,
  logo: 'A',
  color: 'bg-blue-100',
  textColor: 'text-blue-600'
}, {
  id: 4,
  service: 'Disney+',
  description: 'Films et séries Disney, Pixar, Marvel, Star Wars',
  montant: 8.99,
  logo: 'D+',
  color: 'bg-indigo-100',
  textColor: 'text-indigo-600'
}, {
  id: 5,
  service: 'YouTube Premium',
  description: 'YouTube sans publicité et YouTube Music',
  montant: 11.99,
  logo: 'YT',
  color: 'bg-red-100',
  textColor: 'text-red-600'
}, {
  id: 6,
  service: 'Apple Music',
  description: 'Musique en streaming par Apple',
  montant: 9.99,
  logo: 'AM',
  color: 'bg-gray-100',
  textColor: 'text-gray-600'
}];
const SubscriptionsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  // Calculate total monthly cost
  const totalMonthlyCost = subscriptionsData.reduce((total, subscription) => {
    return total + subscription.montant;
  }, 0);
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes abonnements</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos abonnements et services récurrents
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <PlusIcon className="mr-2 h-4 w-4" />
            Ajouter un abonnement
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium">Abonnements actifs</h2>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total mensuel: {totalMonthlyCost.toFixed(2)} €
              </span>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {subscriptionsData.map(subscription => <div key={subscription.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${subscription.color} dark:bg-opacity-30 ${subscription.textColor} dark:text-opacity-90`}>
                        <span className="font-bold">{subscription.logo}</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">
                          {subscription.service}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>
                            Renouvelé le {formatDate(subscription.dateDebut)} de
                            chaque mois
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {subscription.montant.toFixed(2)} €/mois
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Expire le {formatDate(subscription.dateExpiration)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-3">
                    <button className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-medium">
                      Détails
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium">
                      Annuler
                    </button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Informations</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCardIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      Méthodes de paiement
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Vos abonnements sont débités sur votre carte **** 1121
                    </p>
                    <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                      Modifier
                    </button>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircleIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Recevez des alertes avant chaque renouvellement
                      d'abonnement
                    </p>
                    <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                      Configurer
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Coût mensuel total</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      Abonnements actifs
                    </span>
                    <span>{subscriptionsData.length}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Coût mensuel
                    </span>
                    <span className="font-medium">
                      {totalMonthlyCost.toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600 dark:text-gray-300">
                      Coût annuel
                    </span>
                    <span className="font-medium">
                      {(totalMonthlyCost * 12).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Subscription Modal */}
      {showAddModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Ajouter un abonnement</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {availableServices.map(service => <div key={service.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${service.color} dark:bg-opacity-30 ${service.textColor} dark:text-opacity-90`}>
                        <span className="font-bold">{service.logo}</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">
                          {service.service}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-medium">
                        {service.montant.toFixed(2)} €/mois
                      </p>
                      <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                        S'abonner
                      </button>
                    </div>
                  </div>)}
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => setShowAddModal(false)} className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default SubscriptionsPage;