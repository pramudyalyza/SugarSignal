import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const inputData = await req.json()

  const response = await fetch("https://sugarsignal-production.up.railway.app/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch prediction" }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json({ prediction: data.prediction })
}