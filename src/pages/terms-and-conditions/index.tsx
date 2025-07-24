import { FC } from "react";
import Head from "next/head";
import Layout from "@/src/components/layout";

const TermsAndConditions: FC = () => {
  return (
    <Layout>
      <section className="mt-10">
        <Head>
          <title>Terms & Conditions - AREAL</title>
        </Head>
      </section>

      {/* Main Content Section */}
      <section className="min-h-screen bg-transparent">
        <div className="flex max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <aside className="w-80 min-h-screen bg-slate-800/50 border-r border-slate-700/50 p-8">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-slate-300 mb-6">
                Terms & Conditions
              </h2>
              <nav className="space-y-3">
                <a
                  href="#acceptance"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Acceptance of Terms
                </a>
                <a
                  href="#services"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Services Provided
                </a>
                <a
                  href="#user-obligations"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  User Obligations
                </a>
                <a
                  href="#intellectual-property"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Intellectual Property
                </a>
                <a
                  href="#limitation"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Limitation of Liability
                </a>
                <a
                  href="#privacy"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Privacy and Security
                </a>
                <a
                  href="#modifications"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Modifications
                </a>
                <a
                  href="#termination"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Termination
                </a>
                <a
                  href="#governing-law"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Governing Law
                </a>
                <a
                  href="#contact"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Contact Information
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-12">
            <div className="max-w-4xl">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Terms & Conditions
                </h1>
                <div className="h-px bg-gradient-to-r from-slate-600 to-transparent mb-6"></div>
                <p className="text-slate-400 text-lg">
                  The below terms and conditions shall be effective starting
                  from May 4th, 2022.
                </p>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  These Terms and Conditions explain how AREAL operates, the
                  services we provide, and the terms that apply when you use our
                  website https://www.arealchain.com and online services (the
                  "Services") when you interact with us as described below.
                </p>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  We may change these Terms and Conditions over time at our sole
                  discretion. If we make changes, we will notify you by revising
                  the date at the top of these Terms and Conditions, and the
                  updated Terms and Conditions will be posted via a hyperlink at
                  the bottom of our website homepage. In some cases, we may
                  provide you with additional notice (such as by adding a
                  statement relating to Terms and Conditions changes to our
                  website homepage or by sending an email notification). We
                  encourage you to review these Terms and Conditions whenever
                  you access the Services.
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-12">
                <section id="acceptance">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Acceptance of Terms
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    By accessing and using AREAL's services, you accept and
                    agree to be bound by the terms and provision of this
                    agreement. If you do not agree to abide by the above, please
                    do not use this service.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Your use of our services constitutes your acceptance of
                    these terms, and we reserve the right to update or modify
                    these terms at any time without prior notice.
                  </p>
                </section>

                <section id="services">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Services Provided
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    AREAL provides a Layer-1 Blockchain platform for tokenizing
                    real estate assets and offering related financial services.
                    Our platform enables users to:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>
                      Access tokenized real estate investment opportunities
                    </li>
                    <li>
                      Participate in decentralized finance (DeFi) protocols
                    </li>
                    <li>Utilize blockchain-based property management tools</li>
                    <li>Engage in peer-to-peer real estate transactions</li>
                  </ul>
                </section>

                <section id="user-obligations">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    User Obligations
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    As a user of our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>
                      Provide accurate and complete information when creating an
                      account
                    </li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not engage in fraudulent or malicious activities</li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </section>

                <section id="intellectual-property">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Intellectual Property Rights
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The service and its original content, features, and
                    functionality are and will remain the exclusive property of
                    AREAL and its licensors. The service is protected by
                    copyright, trademark, and other laws.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Our trademarks and trade dress may not be used in connection
                    with any product or service without our prior written
                    consent.
                  </p>
                </section>

                <section id="limitation">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    In no event shall AREAL, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses,
                    resulting from your use of the service.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    AREAL is not responsible for any losses, damages, or issues
                    arising from your use of our services, including but not
                    limited to technical failures, market volatility, or
                    third-party actions.
                  </p>
                </section>

                <section id="privacy">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Privacy and Security
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Your privacy is of utmost importance to us. We are committed
                    to protecting your personal information and maintaining the
                    highest standards of data security.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Please refer to our Privacy Policy for detailed information
                    about how we collect, use, and protect your personal data.
                  </p>
                </section>

                <section id="modifications">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Modifications to Terms
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material,
                    we will try to provide at least 30 days notice prior to any
                    new terms taking effect.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    What constitutes a material change will be determined at our
                    sole discretion. By continuing to access or use our service
                    after those revisions become effective, you agree to be
                    bound by the revised terms.
                  </p>
                </section>

                <section id="termination">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Termination
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We may terminate or suspend your account immediately,
                    without prior notice or liability, for any reason
                    whatsoever, including without limitation if you breach the
                    Terms.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Upon termination, your right to use the service will cease
                    immediately. If you wish to terminate your account, you may
                    simply discontinue using the service.
                  </p>
                </section>

                <section id="governing-law">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Governing Law
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    These Terms shall be interpreted and governed in accordance
                    with the laws of the jurisdiction where AREAL operates,
                    without regard to its conflict of law provisions. Our
                    failure to enforce any right or provision of these Terms
                    will not be considered a waiver of those rights.
                  </p>
                </section>

                <section
                  id="contact"
                  className="border-t border-slate-700/50 pt-8"
                >
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Contact Information
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    If you have any questions about these Terms & Conditions,
                    please contact us at{" "}
                    <strong className="text-white">info@arealchain.com</strong>.
                    We will respond to your inquiries as promptly as possible.
                  </p>
                </section>
              </div>
            </div>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditions;
