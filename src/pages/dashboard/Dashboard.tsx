import React from 'react';
import { CreditCardIcon, ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from 'lucide-react';
import BankCard from '../../components/cards/BankCard';
import TransactionList from '../../components/transactions/TransactionList';
// Mock data
const userData = {
  nom: 'John Doe',
  email: 'john.doe@gmail.com'
};
const cardData = {
  id: 1,
  numero: '1234-5678-9101-1121',
  solde: 5000,
  dateExpiration: '12/27'
};
const transactions = [{
  id: 1,
  montant: 120,
  type: 'PAIEMENT',
  description: 'Amazon',
  dateTransaction: '2025-04-01'
}, {
  id: 2,
  montant: 45.5,
  type: 'PAIEMENT',
  description: 'Restaurant',
  dateTransaction: '2025-03-30'
}, {
  id: 3,
  montant: 1000,
  type: 'DEPOT',
  description: 'Salaire',
  dateTransaction: '2025-03-28'
}, {
  id: 4,
  montant: 35,
  type: 'PAIEMENT',
  description: 'Netflix',
  dateTransaction: '2025-03-25'
}, {
  id: 5,
  montant: 60,
  type: 'PAIEMENT',
  description: 'Carburant',
  dateTransaction: '2025-03-22'
}];
const Dashboard: React.FC = () => {
  // Calculate totals
  const totalIn = transactions.filter(t => t.type === 'DEPOT').reduce((acc, curr) => acc + curr.montant, 0);
  const totalOut = transactions.filter(t => t.type === 'PAIEMENT').reduce((acc, curr) => acc + curr.montant, 0);
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenue, {userData.nom}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <div className="mr-2 h-4 w-4" />
            Effectuer un paiement
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Solde actuel
              </h2>
              <p className="text-lg font-semibold">
                {cardData.solde.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <ArrowDownIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Entrées
              </h2>
              <p className="text-lg font-semibold">
                {totalIn.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <ArrowUpIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sorties
              </h2>
              <p className="text-lg font-semibold">
                {totalOut.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <TrendingUpIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Abonnements
              </h2>
              <p className="text-lg font-semibold">2 actifs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Ma carte</h2>
            </div>
            <div className="p-4">
              <BankCard cardNumber={cardData.numero} cardHolder={userData.nom} expiryDate={cardData.dateExpiration} />
              <div className="mt-4 flex justify-between">
                <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                  Voir détails
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 font-medium">
                  Gérer ma carte
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">Abonnements actifs</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold">N</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Netflix</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mensuel
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">14.99 €</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">S</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Spotify</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mensuel
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">9.99 €</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Gérer les abonnements
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium">Transactions récentes</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                Voir tout
              </button>
            </div>
            <div className="p-4">
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;