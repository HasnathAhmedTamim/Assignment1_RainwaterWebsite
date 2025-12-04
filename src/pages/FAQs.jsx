import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: 'What is the Rainwater Convention?',
    answer:
      'The Rainwater Convention is an annual gathering of professionals, researchers, and enthusiasts focused on rainwater harvesting, sustainable water management, and conservation practices. It features keynote speakers, workshops, and networking opportunities.',
  },
  {
    question: 'When and where is the convention held?',
    answer:
      'The 2025 Rainwater Convention will be held from June 15-17, 2025, at the Green Conference Center in Portland, Oregon. The event spans three days with various sessions and activities.',
  },
  {
    question: 'Who should attend this convention?',
    answer:
      'The convention is ideal for environmental engineers, urban planners, sustainability consultants, researchers, students, and anyone interested in water conservation and rainwater harvesting systems.',
  },
  {
    question: 'What is the registration fee?',
    answer:
      'Early bird registration is $299 for professionals and $149 for students (with valid ID). Regular registration starts at $399. Group discounts are available for organizations registering 5 or more participants.',
  },
  {
    question: 'What topics will be covered?',
    answer:
      'Topics include rainwater harvesting systems design, urban water management, climate adaptation strategies, policy and regulations, case studies from around the world, and emerging technologies in water conservation.',
  },
  {
    question: 'Is accommodation included in the registration?',
    answer:
      'Accommodation is not included in the registration fee. However, we have partnered with nearby hotels to offer discounted rates for convention attendees. Details will be provided upon registration.',
  },
  {
    question: 'Can I get a certificate of attendance?',
    answer:
      'Yes, all registered participants who attend the full convention will receive a certificate of attendance. Professional development credits may also be available depending on your industry.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations made more than 30 days before the event receive a full refund minus a $50 processing fee. Cancellations within 30 days are non-refundable, but registration can be transferred to another person.',
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 id="faq-heading" className="text-blue-700 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">Find answers to common questions about the Rainwater Convention</p>
        </div>

        <div className="space-y-4" role="list" aria-labelledby="faq-heading">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              role="listitem"
            >
              <button
                id={`faq-toggle-${index}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900">{faq.question}</span>
                <span className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <FiChevronUp className="w-5 h-5 text-blue-700" aria-hidden="true" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-blue-700" aria-hidden="true" />
                  )}
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-toggle-${index}`}
                className={`${openIndex === index ? 'px-6 pb-6 pt-0' : 'hidden'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
