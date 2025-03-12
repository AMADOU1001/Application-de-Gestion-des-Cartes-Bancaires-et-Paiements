import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
interface Transaction {
  id: number;
  montant: number;
  type: string;
  description: string;
  dateTransaction: string;
}
interface TransactionListProps {
  transactions: Transaction[];
}
const TransactionList: React.FC<TransactionListProps> = ({
  transactions
}) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  return <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map(transaction => <li key={transaction.id} className="py-4 hover:bg-gray-50 dark:hover:bg-gray-750 px-2 rounded-lg transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                  ${transaction.type === 'DEPOT' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'DEPOT' ? <ArrowDownIcon className="h-5 w-5" /> : <ArrowUpIcon className="h-5 w-5" />}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.dateTransaction)}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${transaction.type === 'DEPOT' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {transaction.type === 'DEPOT' ? '+' : '-'}
                {transaction.montant.toLocaleString()} €
              </div>
            </div>
          </li>)}
      </ul>
    </div>;
};
export default TransactionList;