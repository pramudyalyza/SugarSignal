"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Heart, AlertTriangle, Activity, User, Droplets } from "lucide-react"

interface FormData {
  Pregnancies: number
  Glucose: number
  BloodPressure: number
  SkinThickness: number
  Insulin: number
  BMI: number
  DiabetesPedigreeFunction: number
  Age: number
}

const inputFields = [
  {
    key: "Pregnancies" as keyof FormData,
    label: "Pregnancies",
    icon: User,
    description: "Number of times pregnant",
    type: "int",
    min: 0,
    max: 20,
  },
  {
    key: "Glucose" as keyof FormData,
    label: "Glucose Level",
    icon: Droplets,
    description: "Plasma glucose concentration (mg/dL)",
    type: "int",
    min: 0,
    max: 300,
  },
  {
    key: "BloodPressure" as keyof FormData,
    label: "Blood Pressure",
    icon: Activity,
    description: "Diastolic blood pressure (mmHg)",
    type: "int",
    min: 0,
    max: 200,
  },
  {
    key: "SkinThickness" as keyof FormData,
    label: "Skin Thickness",
    icon: User,
    description: "Triceps skin fold thickness (mm)",
    type: "int",
    min: 0,
    max: 100,
  },
  {
    key: "Insulin" as keyof FormData,
    label: "Insulin",
    icon: Droplets,
    description: "2-Hour serum insulin (μU/mL)",
    type: "int",
    min: 0,
    max: 1000,
  },
  {
    key: "BMI" as keyof FormData,
    label: "BMI",
    icon: User,
    description: "Body mass index (weight in kg/(height in m)²)",
    type: "float",
    min: 0,
    max: 70,
    step: 0.1,
  },
  {
    key: "DiabetesPedigreeFunction" as keyof FormData,
    label: "Diabetes Pedigree Function",
    icon: User,
    description: "Diabetes pedigree function score",
    type: "float",
    min: 0,
    max: 3,
    step: 0.001,
  },
  {
    key: "Age" as keyof FormData,
    label: "Age",
    icon: User,
    description: "Age in years",
    type: "int",
    min: 1,
    max: 120,
  },
]

export function PredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    Pregnancies: 1,
    Glucose: 120,
    BloodPressure: 80,
    SkinThickness: 20,
    Insulin: 80,
    BMI: 25.0,
    DiabetesPedigreeFunction: 0.5,
    Age: 30,
  })

  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number.parseFloat(value) || 0,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),})

      if (!res.ok) {
        throw new Error("API error")
      }

      const data = await res.json()
      setResult(data.prediction)

    } catch (err) {
      setError("Failed to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-3">
            <Activity className="h-6 w-6" />
            Health Assessment Form
          </CardTitle>
          <CardDescription className="text-emerald-50">
            Please provide accurate health information for the most reliable diabetes risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon
                return (
                  <div key={field.key} className="space-y-3">
                    <Label htmlFor={field.key} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-emerald-600" />
                      {field.label}
                    </Label>
                    <Input
                      id={field.key}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.type === "float" ? field.step : undefined}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Analyzing Your Health Data...
                  </>
                ) : (
                  <>
                    <Activity className="mr-3 h-5 w-5" />
                    Get Diabetes Risk Assessment
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5" />
          <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <Card className="shadow-xl border-0 overflow-hidden">
          {result === 0 ? (
            <div className="bg-emerald-600">
              <CardHeader className="text-white text-center py-8">
                <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">Excellent News!</CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-8">
                <div className="text-center space-y-4">
                  <div className="text-8xl text-emerald-600 mb-6">✓</div>
                  <h3 className="text-2xl font-bold text-emerald-600 mb-4">Low Diabetes Risk</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Based on your health information, our AI model indicates you have a <strong>low risk</strong> of
                    diabetes. Keep up the great work with your healthy lifestyle!
                  </p>
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 max-w-2xl mx-auto">
                    <ul className="text-sm text-green-700 space-y-1 text-left pl-4 list-disc">
                      <li>Continue regular physical activity</li>
                      <li>Maintain a balanced diet</li>
                      <li>Schedule regular health check-ups</li>
                      <li>Monitor your weight and blood pressure</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </div>
          ) : (
            <div className="bg-red-500">
              <CardHeader className="text-white text-center py-8">
                <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">Important Health Alert</CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-8">
                <div className="text-center space-y-4">
                  <div className="text-8xl text-red-500 mb-6">⚠</div>
                  <h3 className="text-2xl font-bold text-red-500 mb-4">Higher Diabetes Risk Detected</h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Based on your health information, our AI model indicates you may have a <strong>higher risk</strong>{" "}
                    of diabetes. This is not a diagnosis, but we strongly recommend consulting with a healthcare
                    professional.
                  </p>
                  <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200 max-w-2xl mx-auto">
                    <ul className="text-sm text-red-700 space-y-1 text-left pl-4 list-disc">
                      <li>Schedule an appointment with your doctor</li>
                      <li>Request comprehensive diabetes screening</li>
                      <li>Discuss lifestyle modifications</li>
                      <li>Consider dietary consultation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
