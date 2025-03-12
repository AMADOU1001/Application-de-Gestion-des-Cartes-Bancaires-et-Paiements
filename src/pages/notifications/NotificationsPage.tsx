import React, { useState } from 'react';
import { BellIcon, MailIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, ToggleLeftIcon, ToggleRightIcon } from 'lucide-react';
// Mock data
const notificationsData = [{
  id: 1,
  type: 'TRANSACTION',
  titre: 'Nouveau paiement',
  message: 'Un paiement de 120€ a été effectué chez Amazon',
  date: '2025-04-01T10:30:00',
  lu: true
}, {
  id: 2,
  type: 'ALERTE',
  titre: 'Solde faible',
  message: 'Le solde de votre compte est inférieur à 100€',
  date: '2025-03-30T14:15:00',
  lu: false
}, {
  id: 3,
  type: 'CARTE',
  titre: 'Carte bientôt expirée',
  message: 'Votre carte va expirer dans 30 jours',
  date: '2025-03-28T09:45:00',
  lu: false
}, {
  id: 4,
  type: 'TRANSACTION',
  titre: 'Abonnement renouvelé',
  message: 'Votre abonnement Netflix a été renouvelé pour 14.99€',
  date: '2025-03-25T12:00:00',
  lu: true
}, {
  id: 5,
  type: 'LITIGE',
  titre: 'Réclamation mise à jour',
  message: 'Votre réclamation concernant le double paiement a été acceptée',
  date: '2025-03-22T16:20:00',
  lu: true
}];
const notificationSettings = [{
  id: 1,
  categorie: 'Transactions',
  email: true,
  sms: true,
  push: true
}, {
  id: 2,
  categorie: 'Alertes de sécurité',
  email: true,
  sms: true,
  push: true
}, {
  id: 3,
  categorie: 'Alertes de solde',
  email: true,
  sms: false,
  push: true
}, {
  id: 4,
  categorie: 'Abonnements',
  email: true,
  sms: false,
  push: false
}, {
  id: 5,
  categorie: 'Litiges',
  email: true,
  sms: false,
  push: true
}, {
  id: 6,
  categorie: 'Promotions',
  email: false,
  sms: false,
  push: false
}];
const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [filter, setFilter] = useState<string | null>(null);
  const [settings, setSettings] = useState(notificationSettings);
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
      return "Aujourd'hui " + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInDays === 1) {
      return 'Hier ' + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };
  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TRANSACTION':
        return <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'ALERTE':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'CARTE':
        return <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'LITIGE':
        return <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };
  // Toggle notification setting
  const toggleSetting = (id: number, channel: 'email' | 'sms' | 'push') => {
    setSettings(prevSettings => prevSettings.map(setting => setting.id === id ? {
      ...setting,
      [channel]: !setting[channel]
    } : setting));
  };
  // Filter notifications
  const filteredNotifications = filter ? notificationsData.filter(notification => notification.type === filter) : notificationsData;
  // Count unread notifications
  const unreadCount = notificationsData.filter(notification => !notification.lu).length;
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos alertes et préférences de notification
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'notifications' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => setActiveTab('notifications')}>
              Notifications
              {unreadCount > 0 && <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {unreadCount}
                </span>}
            </button>
            <button className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'settings' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => setActiveTab('settings')}>
              Paramètres
            </button>
          </div>
        </div>
        {activeTab === 'notifications' && <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
              <div className="flex space-x-2">
                <button className={`px-3 py-1 text-xs rounded-full ${filter === null ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`} onClick={() => setFilter(null)}>
                  Toutes
                </button>
                <button className={`px-3 py-1 text-xs rounded-full ${filter === 'TRANSACTION' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`} onClick={() => setFilter('TRANSACTION')}>
                  Transactions
                </button>
                <button className={`px-3 py-1 text-xs rounded-full ${filter === 'ALERTE' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`} onClick={() => setFilter('ALERTE')}>
                  Alertes
                </button>
                <button className={`px-3 py-1 text-xs rounded-full ${filter === 'CARTE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`} onClick={() => setFilter('CARTE')}>
                  Cartes
                </button>
              </div>
              <button className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                Marquer tout comme lu
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNotifications.length === 0 ? <div className="p-6 text-center">
                  <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Aucune notification
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Vous n'avez pas encore de notifications dans cette
                    catégorie.
                  </p>
                </div> : filteredNotifications.map(notification => <div key={notification.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${!notification.lu ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {notification.titre}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(notification.date)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>)}
            </div>
          </>}
        {activeTab === 'settings' && <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              Paramètres de notification
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Canaux de notification
                </h3>
                <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm">Email</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Actif
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm">Notifications push</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Actif
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm">SMS</span>
                    </div>
                    <button className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
                      Configurer
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-750">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6">
                        Catégorie
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                        SMS
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Push
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {settings.map(setting => <tr key={setting.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                          {setting.categorie}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <button onClick={() => toggleSetting(setting.id, 'email')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            {setting.email ? <ToggleRightIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> : <ToggleLeftIcon className="h-5 w-5" />}
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <button onClick={() => toggleSetting(setting.id, 'sms')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            {setting.sms ? <ToggleRightIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> : <ToggleLeftIcon className="h-5 w-5" />}
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                          <button onClick={() => toggleSetting(setting.id, 'push')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            {setting.push ? <ToggleRightIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> : <ToggleLeftIcon className="h-5 w-5" />}
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="pt-3 flex justify-end">
                <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default NotificationsPage;