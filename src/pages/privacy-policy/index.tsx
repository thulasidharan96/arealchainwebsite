import { FC } from "react";
import Head from "next/head";
import Layout from "@/src/components/layout";

const PrivacyPolicy: FC = () => {
  return (
    <Layout>
      <section className="mt-10">
        <Head>
          <title>Privacy Policy - AREAL</title>
        </Head>
      </section>

      {/* Main Content Section */}
      <section className="min-h-screen bg-transparent">
        <div className="flex max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <aside className="w-80 min-h-screen bg-slate-800/50 border-r border-slate-700/50 p-8">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-slate-300 mb-6">
                Privacy Policy
              </h2>
              <nav className="space-y-3">
                <a
                  href="#data-protection"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Data Protection
                </a>
                <a
                  href="#consent"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Consent
                </a>
                <a
                  href="#information-collect"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Information We Collect
                </a>
                <a
                  href="#how-we-use"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  How We Use Information
                </a>
                <a
                  href="#data-sharing"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Data Sharing
                </a>
                <a
                  href="#log-files"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Log Files
                </a>
                <a
                  href="#cookies"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Cookies & Web Beacons
                </a>
                <a
                  href="#data-security"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Data Security
                </a>
                <a
                  href="#data-retention"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Data Retention
                </a>
                <a
                  href="#your-rights"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Your Data Rights
                </a>
                <a
                  href="#third-party"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Third-Party Services
                </a>
                <a
                  href="#children"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Children's Privacy
                </a>
                <a
                  href="#changes"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Policy Changes
                </a>
                <a
                  href="#contact"
                  className="block text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/50"
                >
                  Contact Us
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
                  Privacy Policy
                </h1>
                <div className="h-px bg-gradient-to-r from-slate-600 to-transparent mb-6"></div>
                <p className="text-slate-400 text-lg">
                  The below privacy policy shall be effective starting from May
                  4th, 2022.
                </p>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  This Privacy Policy explains how AREAL collects, uses, and
                  discloses information about you when you use our website
                  https://www.areal.com and online services (the "Services")
                  when you interact with us as described below.
                </p>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  We may change this Privacy Policy over time at our sole
                  discretion. If we make changes, we will notify you by revising
                  the date at the top of this Privacy Policy, and the updated
                  Privacy Policy will be posted via a hyperlink at the bottom of
                  our website homepage. In some cases, we may provide you with
                  additional notice (such as by adding a statement relating to
                  Privacy Policy changes to our website homepage or by sending
                  an email notification). We encourage you to review this
                  Privacy Policy whenever you access the Services.
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-12">
                <section id="data-protection">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Data Protection
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    AREAL is committed to protecting your personal information
                    and maintaining the highest standards of data protection. We
                    comply with applicable data protection laws and regulations,
                    including GDPR where applicable.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    We implement appropriate technical and organizational
                    measures to ensure a level of security appropriate to the
                    risk of processing your personal data.
                  </p>
                </section>

                <section id="consent">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Consent
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    By using our website and services, you hereby consent to our
                    Privacy Policy and agree to its terms. Your consent is
                    obtained through your voluntary use of our services.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    You have the right to withdraw your consent at any time by
                    discontinuing use of our services or contacting us directly.
                  </p>
                </section>

                <section id="information-collect">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We collect several types of information from and about users
                    of our services:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Personal Information
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Information you provide directly to us, such as your
                        name, email address, phone number, and account
                        credentials when you register or contact us.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Usage Information
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Information about how you use our services, including
                        your interactions with our platform, transaction
                        history, and preferences.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        Device Information
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Information about your device, browser type, operating
                        system, IP address, and other technical identifiers.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="how-we-use">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We use the information we collect for various purposes,
                    including:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>
                      Provide, operate, and maintain our website and services
                    </li>
                    <li>Improve, personalize, and expand our platform</li>
                    <li>Understand and analyze how you use our services</li>
                    <li>Process transactions and manage your account</li>
                    <li>
                      Communicate with you, including for customer service,
                      updates, and promotions
                    </li>
                    <li>Ensure security and prevent fraud</li>
                    <li>
                      Comply with legal obligations and regulatory requirements
                    </li>
                  </ul>
                </section>

                <section id="data-sharing">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Data Sharing and Disclosure
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except in
                    the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>
                      With service providers who assist us in operating our
                      platform
                    </li>
                    <li>
                      When required by law or to comply with legal processes
                    </li>
                    <li>
                      To protect our rights, property, or safety, or that of
                      others
                    </li>
                    <li>
                      In connection with a business transaction, such as a
                      merger or acquisition
                    </li>
                  </ul>
                </section>

                <section id="log-files">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Log Files
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    AREAL follows standard procedure of using log files. These
                    files log visitors when they visit websites. The information
                    collected by log files includes:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>Internet Protocol (IP) addresses</li>
                    <li>Browser type and version</li>
                    <li>Date and time of visit</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    This information is used for analyzing trends, administering
                    the site, tracking user movement, and gathering demographic
                    information.
                  </p>
                </section>

                <section id="cookies">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Cookies and Web Beacons
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Like many websites, AREAL uses cookies to enhance your
                    experience. Cookies are small files that are stored on your
                    device to help us:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Provide personalized content and recommendations</li>
                    <li>Analyze site traffic and usage patterns</li>
                    <li>Improve site functionality and performance</li>
                  </ul>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    You can choose to disable cookies through your browser
                    settings, though this may affect the functionality of our
                    services.
                  </p>
                </section>

                <section id="data-security">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Data Security
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    We implement appropriate security measures to protect your
                    personal information against unauthorized access,
                    alteration, disclosure, or destruction. These measures
                    include:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </section>

                <section id="data-retention">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Data Retention
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes for which it was
                    collected, comply with legal obligations, resolve disputes,
                    and enforce our agreements. When we no longer need your
                    information, we will securely delete or anonymize it.
                  </p>
                </section>

                <section id="your-rights">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Your Data Protection Rights
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Depending on your location, you may have certain rights
                    regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li>
                      <strong>Right to Access:</strong> Request copies of your
                      personal information
                    </li>
                    <li>
                      <strong>Right to Rectification:</strong> Request
                      correction of inaccurate information
                    </li>
                    <li>
                      <strong>Right to Erasure:</strong> Request deletion of
                      your personal information
                    </li>
                    <li>
                      <strong>Right to Restrict Processing:</strong> Request
                      limitation of how we use your data
                    </li>
                    <li>
                      <strong>Right to Data Portability:</strong> Request
                      transfer of your data to another service
                    </li>
                    <li>
                      <strong>Right to Object:</strong> Object to certain types
                      of processing
                    </li>
                  </ul>
                </section>

                <section id="third-party">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Third-Party Services
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Our services may contain links to third-party websites or
                    integrate with third-party services. We are not responsible
                    for the privacy practices of these external services.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    We encourage you to review the privacy policies of any
                    third-party services you access through our platform.
                  </p>
                </section>

                <section id="children">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Children's Privacy
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    Our services are not intended for children under the age of
                    18. We do not knowingly collect personal information from
                    children. If you believe we have collected information from
                    a child, please contact us immediately so we can delete such
                    information.
                  </p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Changes to This Privacy Policy
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "effective date" at the top.
                    We encourage you to review this Privacy Policy periodically
                    for any changes.
                  </p>
                </section>

                <section
                  id="contact"
                  className="border-t border-slate-700/50 pt-8"
                >
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, your
                    data, or your rights, please contact us at:
                  </p>
                  <div className="text-slate-300">
                    <p>
                      <strong className="text-white">Email:</strong>{" "}
                      info@arealchain.com
                    </p>
                    <p className="mt-2">
                      We will respond to your inquiries as promptly as possible
                      and within the timeframes required by applicable law.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
