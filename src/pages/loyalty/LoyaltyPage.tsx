import React, { useState } from 'react';
import { GiftIcon, TrendingUpIcon, ChevronRightIcon, CheckIcon, ShoppingBagIcon } from 'lucide-react';
// Mock data
const loyaltyData = {
  points: 750,
  niveau: 'Silver',
  pointsNextLevel: 1000,
  historique: [{
    id: 1,
    date: '2025-04-01',
    description: 'Achat Amazon',
    points: 25
  }, {
    id: 2,
    date: '2025-03-28',
    description: 'Achat Carrefour',
    points: 40
  }, {
    id: 3,
    date: '2025-03-15',
    description: 'Achat Station Total',
    points: 30
  }, {
    id: 4,
    date: '2025-03-10',
    description: 'Points de bienvenue',
    points: 500
  }],
  recompenses: [{
    id: 1,
    nom: 'Carte cadeau Amazon 10€',
    points: 500,
    image: 'A'
  }, {
    id: 2,
    nom: 'Remise de 5€ sur votre prochain achat',
    points: 300,
    image: '€'
  }, {
    id: 3,
    nom: "Mois d'abonnement Netflix offert",
    points: 800,
    image: 'N'
  }, {
    id: 4,
    nom: 'Cashback de 2% pendant 1 mois',
    points: 1000,
    image: '%'
  }]
};
// Loyalty levels
const loyaltyLevels = [{
  niveau: 'Bronze',
  pointsRequired: 0,
  avantages: ['Accès au programme', '1 point par euro dépensé']
}, {
  niveau: 'Silver',
  pointsRequired: 500,
  avantages: ['Avantages Bronze', '1.2 points par euro dépensé', 'Offres exclusives']
}, {
  niveau: 'Gold',
  pointsRequired: 1000,
  avantages: ['Avantages Silver', '1.5 points par euro dépensé', 'Support prioritaire']
}, {
  niveau: 'Platinum',
  pointsRequired: 2000,
  avantages: ['Avantages Gold', '2 points par euro dépensé', 'Cashback de 1% sur tous les achats']
}];
const LoyaltyPage: React.FC = () => {
  const [showRewardDetails, setShowRewardDetails] = useState<number | null>(null);
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  // Get current level index
  const currentLevelIndex = loyaltyLevels.findIndex(level => level.niveau === loyaltyData.niveau);
  const nextLevel = currentLevelIndex < loyaltyLevels.length - 1 ? loyaltyLevels[currentLevelIndex + 1] : null;
  const progressToNextLevel = nextLevel ? loyaltyData.points / nextLevel.pointsRequired * 100 : 100;
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Programme de fidélité</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Accumulez des points et échangez-les contre des récompenses
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-lg font-medium">
                    Niveau {loyaltyData.niveau}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {loyaltyData.points} points accumulés
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <GiftIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              {nextLevel && <div className="mt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression vers {nextLevel.niveau}</span>
                    <span>
                      {loyaltyData.points} / {nextLevel.pointsRequired} points
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" style={{
                  width: `${progressToNextLevel}%`
                }}></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Plus que {nextLevel.pointsRequired - loyaltyData.points}{' '}
                    points pour atteindre le niveau {nextLevel.niveau}
                  </p>
                </div>}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium">Récompenses disponibles</h2>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {loyaltyData.points} points disponibles
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loyaltyData.recompenses.map(reward => <div key={reward.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer" onClick={() => setShowRewardDetails(reward.id)}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                      {reward.image}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium">{reward.nom}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {reward.points} points
                        </span>
                        <button className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                          Échanger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Historique des points</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {loyaltyData.historique.map(item => <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{item.points} points
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Niveaux de fidélité</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {loyaltyLevels.map((level, index) => <div key={level.niveau} className={`flex items-start ${level.niveau === loyaltyData.niveau ? 'opacity-100' : 'opacity-60'}`}>
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${level.niveau === loyaltyData.niveau ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                      {level.niveau === loyaltyData.niveau ? <CheckIcon className="h-4 w-4" /> : <span className="text-xs font-medium">{index + 1}</span>}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${level.niveau === loyaltyData.niveau ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {level.niveau} ({level.pointsRequired}+ points)
                      </h3>
                      <ul className="mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        {level.avantages.map((avantage, i) => <li key={i} className="flex items-start">
                            <ChevronRightIcon className="h-3 w-3 mr-1 mt-0.5" />
                            <span>{avantage}</span>
                          </li>)}
                      </ul>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Comment gagner des points</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <ShoppingBagIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      Effectuez des achats
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Gagnez des points à chaque achat effectué avec votre carte
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <TrendingUpIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      Utilisez nos services
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Gagnez des points en utilisant régulièrement nos services
                      bancaires
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <GiftIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Parrainez vos amis</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Recevez 250 points pour chaque ami parrainé qui ouvre un
                      compte
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reward Details Modal */}
      {showRewardDetails !== null && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Détails de la récompense</h3>
              <button onClick={() => setShowRewardDetails(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {(() => {
            const reward = loyaltyData.recompenses.find(r => r.id === showRewardDetails);
            if (!reward) return null;
            const canRedeem = loyaltyData.points >= reward.points;
            return <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl font-bold">
                        {reward.image}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium">{reward.nom}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {reward.points} points requis
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Description</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cette récompense vous permet d'obtenir{' '}
                        {reward.nom.toLowerCase()}. Après échange, vous recevrez
                        un code par email dans les 24 heures.
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Vos points</h4>
                        <p className="text-sm">{loyaltyData.points} points</p>
                      </div>
                      {!canRedeem && <div className="text-right">
                          <h4 className="text-sm font-medium">
                            Points manquants
                          </h4>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            {reward.points - loyaltyData.points} points
                          </p>
                        </div>}
                    </div>
                    <div className="pt-3">
                      <button disabled={!canRedeem} className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${canRedeem ? 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'} transition-colors`}>
                        {canRedeem ? 'Échanger maintenant' : 'Points insuffisants'}
                      </button>
                    </div>
                  </div>;
          })()}
            </div>
          </div>
        </div>}
    </div>;
};
export default LoyaltyPage;