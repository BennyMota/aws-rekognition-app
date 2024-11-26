'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [results, setResults] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)
    setResults(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image')
      }

      const data = await response.json()
      setResults(data.labels)
    } catch (err) {
      setError('An error occurred while analyzing the image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Image Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit" disabled={!file || loading}>
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {results && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Results:</h2>
              <ul className="list-disc pl-5">
                {results.map((label, index) => (
                  <li key={index}>
                    {label.Name} ({(label.Confidence as number).toFixed(2)}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

