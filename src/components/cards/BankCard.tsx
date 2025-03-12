import React from 'react';
import { CreditCardIcon } from 'lucide-react';
interface BankCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
}
const BankCard: React.FC<BankCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate
}) => {
  // Format card number to only show last 4 digits
  const maskedNumber = cardNumber.replace(/\d(?=\d{4})/g, '•');
  return <div className="relative w-full h-48 rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900"></div>
      {/* Card pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_0,_transparent_70%)]"></div>
      {/* Card content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="text-white text-lg font-bold">AmadouPay</div>
          <div className="text-white opacity-80">
            <CreditCardIcon className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="text-white text-xl font-mono tracking-wider">
              {maskedNumber}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-white text-xs opacity-70">TITULAIRE</div>
              <div className="text-white font-medium">{cardHolder}</div>
            </div>
            <div>
              <div className="text-white text-xs opacity-70">EXPIRE</div>
              <div className="text-white font-medium">{expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BankCard;