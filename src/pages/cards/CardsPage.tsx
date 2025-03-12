import React, { useState } from 'react';
import { PlusIcon, LockIcon, UnlockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import BankCard from '../../components/cards/BankCard';
// Mock data
const cardsData = [{
  id: 1,
  numero: '1234-5678-9101-1121',
  titulaire: 'John Doe',
  dateExpiration: '12/27',
  solde: 5000,
  active: true
}, {
  id: 2,
  numero: '5678-1234-5678-1234',
  titulaire: 'John Doe',
  dateExpiration: '06/26',
  solde: 1200,
  active: true
}];
const CardsPage: React.FC = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCVV, setShowCVV] = useState<Record<number, boolean>>({});
  const toggleCVV = (cardId: number) => {
    setShowCVV(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes cartes bancaires</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos cartes et leur sécurité
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={() => setShowCardForm(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <PlusIcon className="mr-2 h-4 w-4" />
            Ajouter une carte
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map(card => <div key={card.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <div className="h-48 perspective-1000">
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180`}>
                  {/* Front of the card */}
                  <div className="absolute inset-0 backface-hidden">
                    <BankCard cardNumber={card.numero} cardHolder={card.titulaire} expiryDate={card.dateExpiration} />
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Carte {card.numero.slice(-4)}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${card.active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {card.active ? 'Active' : 'Bloquée'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Solde disponible</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {card.solde.toLocaleString()} €
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">CVV:</span>
                  <div className="flex items-center">
                    <span className="font-mono">
                      {showCVV[card.id] ? '123' : '•••'}
                    </span>
                    <button onClick={() => toggleCVV(card.id)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      {showCVV[card.id] ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="pt-3 flex space-x-2">
                  <button className="flex-1 py-2 px-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    Détails
                  </button>
                  <button className="flex-1 py-2 px-3 inline-flex justify-center items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                    {card.active ? <>
                        <LockIcon className="mr-1.5 h-4 w-4" />
                        Bloquer
                      </> : <>
                        <UnlockIcon className="mr-1.5 h-4 w-4" />
                        Débloquer
                      </>}
                  </button>
                </div>
              </div>
            </div>
          </div>)}
        {/* Add card placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center h-80">
          <button onClick={() => setShowCardForm(true)} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex flex-col items-center space-y-2">
            <PlusIcon className="h-10 w-10" />
            <span className="text-sm font-medium">
              Ajouter une nouvelle carte
            </span>
          </button>
        </div>
      </div>
      {/* Add Card Modal */}
      {showCardForm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Ajouter une nouvelle carte
              </h3>
              <button onClick={() => setShowCardForm(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="p-4 space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Numéro de carte
                </label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9101 1121" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date d'expiration
                  </label>
                  <input type="text" id="expiryDate" placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVV
                  </label>
                  <input type="text" id="cvv" placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nom du titulaire
                </label>
                <input type="text" id="cardHolder" placeholder="John Doe" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="pt-3 flex space-x-3">
                <button type="button" onClick={() => setShowCardForm(false)} className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default CardsPage;