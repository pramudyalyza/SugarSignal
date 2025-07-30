import { PredictionForm } from "@/components/prediction-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Sugar Signal
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI-powered diabetes risk assessment tool to help you understand your health better
            </p>
          </div>
          <PredictionForm />
        </div>
      </div>
    </div>
  )
}
