import React from "react";

const PrivacyPolicy = () => {
  document.title = "Privacy Policy";

  return (
    <div className="py-20 px-5 max-w-3xl mx-auto">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575] mb-6">
        Privacy Policy
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold text-[#008575] mb-4">Introduction</h3>
        <p className="text-lg">
          Welcome to our Library Management System. This Privacy Policy outlines
          the types of personal information that we collect, how we use and
          protect it, and your rights regarding your personal data.
        </p>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Information We Collect</h3>
        <p className="text-lg">
          We collect the following types of personal information:
        </p>
        <ul className="list-disc pl-8 text-lg">
          <li>Personal details (e.g., name, email address, etc.)</li>
          <li>Account information (e.g., login credentials, user preferences)</li>
          <li>Usage data (e.g., browsing history, page interactions)</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">How We Use Your Information</h3>
        <p className="text-lg">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc pl-8 text-lg">
          <li>To provide and improve our services</li>
          <li>To personalize your experience on our platform</li>
          <li>To communicate with you about updates, features, or issues</li>
          <li>To comply with legal obligations and prevent fraud</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">How We Protect Your Information</h3>
        <p className="text-lg">
          We implement a variety of security measures to maintain the safety of
          your personal information. These measures include:
        </p>
        <ul className="list-disc pl-8 text-lg">
          <li>Data encryption during transmission and storage</li>
          <li>Access controls to limit who can view or process your data</li>
          <li>Regular security audits and vulnerability assessments</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Sharing Your Information</h3>
        <p className="text-lg">
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information with trusted
          third-party service providers who help us operate our platform. These
          providers are required to keep your information confidential.
        </p>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Your Rights</h3>
        <p className="text-lg">
          You have the right to:
        </p>
        <ul className="list-disc pl-8 text-lg">
          <li>Access, update, or delete your personal information</li>
          <li>Withdraw consent for certain data processing activities</li>
          <li>Request information about how your data is processed</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Cookies</h3>
        <p className="text-lg">
          Our platform uses cookies to enhance your experience. Cookies are
          small text files stored on your device that help us remember your
          preferences and improve site functionality.
        </p>
        <p className="text-lg">
          You can control cookie settings in your browser. However, disabling
          cookies may affect some features of our platform.
        </p>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Changes to This Privacy Policy</h3>
        <p className="text-lg">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the "Last Updated" date will be revised. We
          encourage you to review this policy periodically.
        </p>

        <h3 className="text-2xl font-bold text-[#008575] mt-6 mb-4">Contact Us</h3>
        <p className="text-lg">
          If you have any questions or concerns about our Privacy Policy, please
          feel free to contact us at:
        </p>
        <p className="text-lg">
          <strong>Email:</strong> support@lbmsltd.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
