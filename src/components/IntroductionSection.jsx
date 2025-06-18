import React from 'react'
import IntroductionCard from './IntroductionCard'

export default function IntroductionSection() {
  return (
    <div>
      <section className="text-gray-600 body-font mt-16 fontp mb-10">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-2xl font-bold title-font mb-4 text-gray-900">
              How It Works?
            </h1>
            <p className="lg:w-6/12 mx-auto leading-relaxed text-base">
              Access financial services with ease and security, tailored to your needs.
              Access Your SACCOSS account, manage savings, apply for loans, and track transactions - all in one secure place.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 w-full mb-6 p-4">
              <IntroductionCard title="Login To Your Account" desc="Login to your SACCOSS account and start reserve meetings to Decentralized Storage." />
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full mb-6 p-4">
              <IntroductionCard title="Deposit & Save" desc="Grow your savings conveniently effortlessly. Choose the date, time, and participants. Emkutano makes reserving easy." />
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full mb-6 p-4">
               <IntroductionCard title="Apply For Loan" desc="Check eligibility and get approved quickly with one click. Invite participants and ensure everyone can join seamlessly." />
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full mb-6 p-4">
              <IntroductionCard title="Track & Withdraw" desc="Monitor your transactions & withdraw when needed with one click. Invite participants and ensure everyone can join seamlessly." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
