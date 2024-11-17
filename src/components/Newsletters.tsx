import React, { useEffect, useState } from 'react'
import { formatSummary } from '../utils/formatSummary'
// Types
interface Story {
  story_id: number
  story_title: string
  story_url: string
  hn_url?: string
  score?: number
  story_summary: string
  story_comments_summary?: string
  created_at: string
  source: string
}

interface NewsletterProps {
  source?: string
  limit?: number
}

// Card components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold">{children}</h3>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4">{children}</div>
)

// Add this CSS class to your global styles or component
const summaryStyles = `
  .digest-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }
  .digest-list li {
    margin: 0.5rem 0;
    line-height: 1.5;
    color: #374151;
  }
  .digest-list li[style*="list-style: none"] {
    margin-left: -1.5rem;
  }
  .nested-list {
    list-style-type: circle;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }
  .nested-list li {
    margin: 0.25rem 0;
  }
`

export default function AIFrontiersArticle({ source, limit }: NewsletterProps) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

    const fetchStories = async () => {
      try {
        setLoading(true)
        // Build the URL with query parameters
        const params = new URLSearchParams()
        // if (source) params.append('source', source)
        if (limit) params.append('limit', limit.toString())
        
        // Make sure to use the full URL path
        const response = await fetch(`${apiUrl}/news?${params.toString()}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })

        // Log the response for debugging
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          // If not JSON, try to get the text content for debugging
          const text = await response.text()
          console.error('Invalid response type:', contentType, 'Response:', text)
          throw new Error('Invalid response type from server')
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data)
          throw new Error('Invalid data format received')
        }

        setStories(data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred while fetching stories')
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [source, limit])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="relative z-0">
      {/* Add the styles to the component */}
      <style>{summaryStyles}</style>
      
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        {source ? `${source} News` : 'Latest News'}
      </h1>
      <p className="text-center text-gray-600 mb-8">{today}</p>
      
      {stories.length === 0 ? (
        <p className="text-center text-gray-600">No stories found</p>
      ) : (
        stories.map((story) => (
          <Card key={story.story_id} className="mb-8">
            <CardHeader>
              <CardTitle>{story.story_title}</CardTitle>
            </CardHeader>
            
            <div className="flex items-center gap-2 px-6 py-2">
              <a href={story.story_url} className="text-blue-600 hover:underline cursor-pointer">
                Original Article
              </a>
              {story.hn_url && (
                <>
                  <span>•</span>
                  <a href={story.hn_url} className="text-blue-600 hover:underline cursor-pointer">
                    HN Discussion
                  </a>
                  <span>•</span>
                  <span className="text-gray-600">Score: {story.score}</span>
                </>
              )}
              <span>•</span>
              <span className="text-gray-600">
                {new Date(story.created_at).toLocaleTimeString()}
              </span>
            </div>

            <CardContent>
              <div className="space-y-6">
                {story.story_summary && (
                  <div className="prose prose-sm max-w-none">
                    <h3 className="font-semibold text-lg mb-3">Article Summary</h3>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: formatSummary(story.story_summary) }} 
                    />
                  </div>
                )}
                
                {story.story_comments_summary && (
                  <div className="prose prose-sm max-w-none">
                    <h3 className="font-semibold text-lg mb-3">Discussion Highlights</h3>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: formatSummary(story.story_comments_summary) }} 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}