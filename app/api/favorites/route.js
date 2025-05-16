
let favorites = []; 
 
export async function GET() {
  return Response.json({ favorites });
}
 
export async function POST(request) {
    const body = await request.json();
    const {name, image, rating, id} = body;

    if (!body?.name)
        return Response.json({ error: "name missing" }, { status: 400 });
    
    if (!favorites.includes(body.name)) favorites.push({ name, image, rating, id });
    
    return Response.json({ ok: true, favorites });
}