
const state = {
    favorites: [],
};
 
export async function GET() {
  return Response.json({ favorites: state.favorites });
}
 
export async function POST(request) {
    const body = await request.json();
    const {name, image, rating, id} = body;

    if (!body?.name)
        return Response.json({ error: "name missing" }, { status: 400 });
    
    if (!state.favorites.some(fav => fav.name === body.name)) {
        state.favorites.push({ name, image, rating, id });
    }
    
    return Response.json({ ok: true, favorites: state.favorites });
}

export async function DELETE(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id || isNaN(Number(id))) return Response.json({ error: "Invalid or missing id" }, { status: 400 });
  
    state.favorites = state.favorites.filter(fav => fav.id !== Number(id));    
    return Response.json({ ok: true, favorites: state.favorites });

}