import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          
          <h1 className="text-blue-700 mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Rainwater Convention 2025
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join us for the premier event on sustainable water management and
            rainwater harvesting. Connect with experts, learn innovative
            techniques, and contribute to a more sustainable future.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Register Now
            </button>
            <button
              onClick={() => navigate('/faqs')}
              className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn more
            </button>
          </div>
        </div>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Date & Time</h3>
            <p className="text-gray-600">January 15, 2025 — 9:00 AM</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Venue</h3>
            <p className="text-gray-600">Banani Conference Hall, Dhaka</p>
          </div>
        </section>
      </div>
    </div>
  );
}
