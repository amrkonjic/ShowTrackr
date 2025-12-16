'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfilePage() {
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    loadProfileAndFavorites();
  }, []);

  async function loadProfileAndFavorites() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setEmail(user.email);

    // Dohvati profil – ako ne postoji, bit će null
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .single()
      .maybeSingle(); // ne baca grešku ako red ne postoji

    // Ako profil ne postoji, kreiraj prazan (da bi kasnije update/upsert radio)
    if (!profileData) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: user.id, username: null, avatar_url: null });

      if (insertError && insertError.code !== '23505') { // 23505 = već postoji
        console.error('Greška pri kreiranju profila:', insertError);
      }
      setProfile({ username: null, avatar_url: null });
    } else {
      setProfile(profileData);

      // Generiraj signed URL ako postoji avatar
      if (profileData.avatar_url) {
        const { data } = await supabase.storage
          .from('avatars')
          .createSignedUrl(profileData.avatar_url, 3600);
        setAvatarUrl(data?.signedUrl || null);
      }
    }

    // Dohvati favorite
    const { data: favs } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setFavorites(favs || []);
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload slike s upsert (overwrite ako postoji)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // UPSERT u profiles tablicu – ovo je ključno!
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert(
          { id: user.id, avatar_url: filePath },
          { onConflict: 'id' } // važno za upsert po ID-u
        );

      if (upsertError) throw upsertError;

      // Generiraj novi signed URL
      const { data } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 3600);

      setAvatarUrl(data?.signedUrl || null);
      setProfile(prev => ({ ...prev, avatar_url: filePath }));
    } catch (error) {
      console.error('Upload greška:', error);
      alert('Greška prilikom uploada: ' + (error.message || 'Nepoznata greška'));
    } finally {
      setUploading(false);
    }
  }

  // Fallback za inicijal (iz emaila ako nema usernamea)
  const displayName = profile?.username || email?.split('@')[0] || 'Korisnik';
  const initialLetter = displayName[0].toUpperCase();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Moj Profil
        </h1>

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 mb-12 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profilna slika"
                  className="w-40 h-40 rounded-full object-cover ring-4 ring-blue-500/30 shadow-xl"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl font-bold text-gray-300 shadow-xl">
                  {initialLetter}
                </div>
              )}

              <label className="absolute bottom-2 right-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={uploadAvatar}
                />
                <span className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center">
                  {uploading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </span>
              </label>
            </div>

            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl font-bold">
                {displayName}
              </h2>
              <p className="text-xl text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                {email}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            Moji Favoriti
          </h2>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">Još nemaš favorita</p>
              <p className="text-gray-600 mt-2">Pregledaj serije i dodaj ih u favorite!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={fav.poster_url || '/placeholder-poster.jpg'}
                    alt={fav.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg truncate">{fav.title}</h3>
                    {fav.rating && (
                      <p className="text-sm flex items-center gap-1 mt-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {fav.rating}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}