

// function that handles search requests
export async function GET(request) {
  // parse the full request URL to extract query parameters
  const { searchParams } = new URL(request.url);
  // get the value of the "q" query parameter (what the user types)
  const q = searchParams.get("q");

  // If query is missing, return an empty list
  if (!q) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  try {
    // send a request to the external TVmaze API 
    const apiRes = await fetch(`https://api.tvmaze.com/search/shows?q=${q}`);
    // parse the JSON response from the external API
    const data = await apiRes.json();

    // transform the API response to a simplified list of shows, keep only the data we need (id and name)
    const shows = data.map((item) => ({
      id: item.show.id,
      name: item.show.name,
    }));

    // return the list of shows as a JSON response with status code 200
    return new Response(JSON.stringify(shows), {
      status: 200,
    });
    } catch (error) {
    console.error("Search API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
