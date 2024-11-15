import { createClient } from '@supabase/supabase-js'

export async function onRequest(context: any) {
  // Updated CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      context.env.SUPABASE_URL!,
      context.env.SUPABASE_ANON_KEY!
    )
    // Get the source from query parameters
    const url = new URL(context.request.url)
    const source = url.searchParams.get('source')
    const limit = url.searchParams.get('limit')

    // Get UTC start and end of today
    const now = new Date()
    const startOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString()
    const endOfDayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)).toISOString()

    // Start building the query
    let query = supabase
      .from(context.env.SUPABASE_TABLE_STORIES!)
      .select('*')
      .gte('created_at', startOfDayUTC)
      .lt('created_at', endOfDayUTC)

    // Add source filter if provided
    if (source) {
      query = query.eq('source', source)
    }

    // Execute the query with ordering and limit
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit ? parseInt(limit) : 10)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      })
    }

    // Format the summary and comments summary
    // const formattedData = data?.map((story: any) => ({
    //   ...story,
    //   story_summary: formatSummary(story.story_summary),
    //   story_comments_summary: formatSummary(story.story_comments_summary)
    // }))

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    })
  }
}