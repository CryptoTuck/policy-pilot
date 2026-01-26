export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Policy Pilot
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
          AI-powered insurance policy analysis and grading
        </p>
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-5">
            How It Works
          </h2>
          <ol className="text-left space-y-3 sm:space-y-4 text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm sm:text-base">1</span>
              <span className="text-sm sm:text-base pt-0.5 sm:pt-1">Connect your insurance data through our secure intake process</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm sm:text-base">2</span>
              <span className="text-sm sm:text-base pt-0.5 sm:pt-1">Our AI analyzes your home and auto coverage</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm sm:text-base">3</span>
              <span className="text-sm sm:text-base pt-0.5 sm:pt-1">Receive a detailed report with grades and recommendations</span>
            </li>
          </ol>
        </div>
        <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-500 px-2">
          Your personalized report link will be sent to you after submitting your policy information.
        </p>
      </div>
    </div>
  );
}
