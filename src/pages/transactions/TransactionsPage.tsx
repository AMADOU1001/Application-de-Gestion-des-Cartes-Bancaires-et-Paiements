import React, { useState } from 'react';
import { FilterIcon, DownloadIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon } from 'lucide-react';
// Mock data
const transactionsData = [{
  id: 1,
  montant: 120,
  type: 'PAIEMENT',
  description: 'Amazon',
  dateTransaction: '2025-04-01',
  categorie: 'Shopping'
}, {
  id: 2,
  montant: 45.5,
  type: 'PAIEMENT',
  description: 'Restaurant Le Gourmet',
  dateTransaction: '2025-03-30',
  categorie: 'Restaurant'
}, {
  id: 3,
  montant: 1000,
  type: 'DEPOT',
  description: 'Salaire',
  dateTransaction: '2025-03-28',
  categorie: 'Revenu'
}, {
  id: 4,
  montant: 35,
  type: 'PAIEMENT',
  description: 'Netflix',
  dateTransaction: '2025-03-25',
  categorie: 'Abonnement'
}, {
  id: 5,
  montant: 60,
  type: 'PAIEMENT',
  description: 'Station Total',
  dateTransaction: '2025-03-22',
  categorie: 'Transport'
}, {
  id: 6,
  montant: 80,
  type: 'PAIEMENT',
  description: 'Carrefour',
  dateTransaction: '2025-03-20',
  categorie: 'Alimentation'
}, {
  id: 7,
  montant: 200,
  type: 'DEPOT',
  description: 'Remboursement',
  dateTransaction: '2025-03-18',
  categorie: 'Revenu'
}, {
  id: 8,
  montant: 15.99,
  type: 'PAIEMENT',
  description: 'Spotify',
  dateTransaction: '2025-03-15',
  categorie: 'Abonnement'
}];
const TransactionsPage: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  // Filter transactions based on search term and selected type
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.categorie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === null || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Historique de toutes vos transactions
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button onClick={() => setShowPaymentModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <ArrowUpIcon className="mr-2 h-4 w-4" />
            Effectuer un paiement
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exporter
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
          </div>
          <div className="flex space-x-3">
            <select value={selectedType || ''} onChange={e => setSelectedType(e.target.value || null)} className="rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option value="">Tous les types</option>
              <option value="PAIEMENT">Paiements</option>
              <option value="DEPOT">Dépôts</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              <FilterIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map(transaction => <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.dateTransaction)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.categorie}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'DEPOT' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {transaction.type === 'DEPOT' ? <ArrowDownIcon className="mr-1 h-3 w-3" /> : <ArrowUpIcon className="mr-1 h-3 w-3" />}
                      {transaction.type === 'DEPOT' ? 'Dépôt' : 'Paiement'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${transaction.type === 'DEPOT' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.type === 'DEPOT' ? '+' : '-'}
                    {transaction.montant.toLocaleString()} €
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de{' '}
            <span className="font-medium">{filteredTransactions.length}</span>{' '}
            transactions
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Précédent
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Suivant
            </button>
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Effectuer un paiement</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="p-4 space-y-4">
              <div>
                <label htmlFor="paymentCard" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Carte à débiter
                </label>
                <select id="paymentCard" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="1">Carte **** 1121 (Solde: 5000 €)</option>
                  <option value="2">Carte **** 1234 (Solde: 1200 €)</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Montant (€)
                </label>
                <input type="number" id="paymentAmount" min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label htmlFor="paymentDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input type="text" id="paymentDescription" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label htmlFor="paymentCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Catégorie
                </label>
                <select id="paymentCategory" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="shopping">Shopping</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="transport">Transport</option>
                  <option value="abonnement">Abonnement</option>
                  <option value="alimentation">Alimentation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="pt-3 flex space-x-3">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default TransactionsPage;