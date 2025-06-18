import React from 'react';
import bgImage from '../assets/images/pattern-randomized.png';
import FeatureCard from './FeatureCard';

// Import icons
import MoneyCheckIcon from '../assets/icons/money-bill-solid.svg';
import PlusIcon from '../assets/icons/plus-solid-new.svg';
import MoneyTransferIcon from '../assets/icons/money-bill-transfer-solid-new.svg';
import ClockIcon from '../assets/icons/clock-solid-new.svg';
import BellIcon from '../assets/icons/bell-solid-new.svg';
import ShieldIcon from '../assets/icons/shield-solid-new.svg';

export default function FeaturesSection() {
  const features = [
    { name: 'Manage Savings', role: 'Easily deposit and withdraw funds securely.', icon: MoneyCheckIcon },
    { name: 'Apply For Loans', role: 'Apply for loans with low-interest rates seamlesly with few button clicks.', icon: PlusIcon },
    { name: 'Track Transactions', role: 'Monitor your spending with real-time tracking.', icon: MoneyTransferIcon },
    { name: 'Pay Instantly', role: 'Send money and pay bills anywhere easily in few seconds.', icon: ClockIcon },
    { name: 'Notifications & Alerts', role: 'Stay updated with instant notifications.', icon: BellIcon },
    { name: 'Secure & Reliable', role: 'Your data is encrypted and protected.', icon: ShieldIcon }
  ];

  return (
    <div 
      className="font-poppins mx-auto mt-16 bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
              Why Choose Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Access financial services with ease and security, tailored to your needs.
              Access Your SACCOSS account, manage savings, apply for loans and track transactions - all in one secure place.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {features.map((feature, index) => (
              <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <FeatureCard index={index} name={feature.name} role={feature.role} icon={feature.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
