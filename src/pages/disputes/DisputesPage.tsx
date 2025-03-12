import React, { useState } from 'react';
import { PlusIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';
// Mock data
const disputesData = [{
  id: 1,
  description: 'Double paiement au restaurant',
  montant: 45.5,
  dateCreation: '2025-03-15',
  statut: 'EN_COURS',
  commentaire: "Le restaurant m'a débité deux fois pour le même repas."
}, {
  id: 2,
  description: 'Abonnement non annulé',
  montant: 14.99,
  dateCreation: '2025-03-10',
  statut: 'RESOLU',
  commentaire: "J'ai été débité malgré ma demande d'annulation de l'abonnement."
}, {
  id: 3,
  description: 'Transaction non reconnue',
  montant: 89.99,
  dateCreation: '2025-03-05',
  statut: 'REJETE',
  commentaire: 'Je ne reconnais pas cette transaction sur mon compte.'
}];
const DisputesPage: React.FC = () => {
  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<number | null>(null);
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EN_COURS':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <ClockIcon className="mr-1 h-3 w-3" />
            En cours
          </span>;
      case 'RESOLU':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Résolu
          </span>;
      case 'REJETE':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircleIcon className="mr-1 h-3 w-3" />
            Rejeté
          </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Inconnu
          </span>;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Litiges et réclamations</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos contestations de paiement
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={() => setShowNewDisputeModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nouvelle réclamation
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Mes réclamations</h2>
        </div>
        {disputesData.length === 0 ? <div className="p-6 text-center">
            <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Aucune réclamation
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Vous n'avez pas encore créé de réclamation.
            </p>
            <div className="mt-6">
              <button onClick={() => setShowNewDisputeModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouvelle réclamation
              </button>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Montant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {disputesData.map(dispute => <tr key={dispute.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer" onClick={() => setSelectedDispute(dispute.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {dispute.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {dispute.montant.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(dispute.dateCreation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(dispute.statut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300" onClick={e => {
                  e.stopPropagation();
                  setSelectedDispute(dispute.id);
                }}>
                        Détails
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">
          Comment contester un paiement ?
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <span className="text-sm font-medium">1</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Identifiez la transaction
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Localisez la transaction contestée dans votre historique de
                transactions.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Créez une réclamation
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cliquez sur "Nouvelle réclamation" et remplissez le formulaire
                avec les détails du litige.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Suivez votre réclamation
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Vous pouvez suivre l'état de votre réclamation à tout moment
                dans cette section.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* New Dispute Modal */}
      {showNewDisputeModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Nouvelle réclamation</h3>
              <button onClick={() => setShowNewDisputeModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="p-4 space-y-4">
              <div>
                <label htmlFor="disputeDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <input type="text" id="disputeDescription" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Ex: Double paiement, Transaction non reconnue..." />
              </div>
              <div>
                <label htmlFor="disputeAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Montant contesté (€)
                </label>
                <input type="number" id="disputeAmount" min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label htmlFor="disputeTransaction" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Transaction concernée
                </label>
                <select id="disputeTransaction" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Sélectionnez une transaction</option>
                  <option value="1">Amazon - 120.00 € - 01/04/2025</option>
                  <option value="2">
                    Restaurant Le Gourmet - 45.50 € - 30/03/2025
                  </option>
                  <option value="4">Netflix - 35.00 € - 25/03/2025</option>
                </select>
              </div>
              <div>
                <label htmlFor="disputeReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Motif de la réclamation
                </label>
                <select id="disputeReason" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Sélectionnez un motif</option>
                  <option value="double_payment">Double paiement</option>
                  <option value="unrecognized">Transaction non reconnue</option>
                  <option value="wrong_amount">Montant incorrect</option>
                  <option value="service_not_provided">
                    Service non fourni
                  </option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="disputeComment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Commentaire
                </label>
                <textarea id="disputeComment" rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" placeholder="Décrivez votre problème en détail..."></textarea>
              </div>
              <div className="pt-3 flex space-x-3">
                <button type="button" onClick={() => setShowNewDisputeModal(false)} className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>}
      {/* Dispute Details Modal */}
      {selectedDispute !== null && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">Détails de la réclamation</h3>
              <button onClick={() => setSelectedDispute(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {(() => {
            const dispute = disputesData.find(d => d.id === selectedDispute);
            if (!dispute) return null;
            return <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </h4>
                      <p className="mt-1 text-sm">{dispute.description}</p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Montant contesté
                        </h4>
                        <p className="mt-1 text-sm">
                          {dispute.montant.toFixed(2)} €
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Date de création
                        </h4>
                        <p className="mt-1 text-sm">
                          {formatDate(dispute.dateCreation)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Statut
                      </h4>
                      <div className="mt-1">
                        {getStatusBadge(dispute.statut)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Commentaire
                      </h4>
                      <p className="mt-1 text-sm">{dispute.commentaire}</p>
                    </div>
                    <div className="pt-3">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Historique
                      </h4>
                      <div className="mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(dispute.dateCreation)}
                          </p>
                          <p className="text-sm">Réclamation créée</p>
                        </div>
                        {dispute.statut === 'EN_COURS' && <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(dispute.dateCreation)}
                            </p>
                            <p className="text-sm">En cours de traitement</p>
                          </div>}
                        {dispute.statut === 'RESOLU' && <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(new Date(new Date(dispute.dateCreation).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
                            </p>
                            <p className="text-sm">
                              Réclamation acceptée et remboursement effectué
                            </p>
                          </div>}
                        {dispute.statut === 'REJETE' && <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(new Date(new Date(dispute.dateCreation).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
                            </p>
                            <p className="text-sm">
                              Réclamation rejetée - Motif: Transaction légitime
                              confirmée
                            </p>
                          </div>}
                      </div>
                    </div>
                    {dispute.statut === 'EN_COURS' && <div className="pt-3">
                        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                          Annuler la réclamation
                        </button>
                      </div>}
                  </div>;
          })()}
            </div>
          </div>
        </div>}
    </div>;
};
export default DisputesPage;