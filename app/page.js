"use client";

import { useEffect, useState } from "react";

export default function PokemonPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pockemon, setPockemon] = useState(null);
  const types = [
    { title: "HP", emoji: "♥️" },
    { title: "Attack", emoji: "⚔" },
    { title: "Defense", emoji: "🛡️" },
  ];
  const fetchPokemonCharacterById = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setPockemon(data);
      } else {
        setError("🙅 iim pockemon oldsongui!!! ");
      }
    } catch (fetError) {
      setError("🛰️ internet ee shalga nuu ");
    }
    setIsLoading(false);
  };
  const showRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetchPokemonCharacterById(randomId);
  };
  useEffect(() => {
    showRandomPokemon();
  }, []);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-12 text-white">
      {/* Background decoration */}
      <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />

      <h1 className="z-10 text-4xl font-black tracking-wide drop-shadow-lg">
        ⚡ Pokémon Cards
      </h1>

      <div className="z-10 flex min-h-[500px] w-full max-w-sm flex-col items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:scale-[1.02]">
        {isLoading && (
          <p className="animate-pulse text-xl font-bold text-white/60">
            ✨ Unshij baina...
          </p>
        )}

        {!isLoading && error !== "" && (
          <p className="text-center text-lg font-bold text-red-300">{error}</p>
        )}

        {!isLoading && error === "" && pockemon !== null && (
          <>
            <div className="flex w-full items-center justify-between">
              <span className="rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-white/70">
                POKÉMON
              </span>
              <span className="text-lg font-black text-yellow-300">
                #{pockemon.id}
              </span>
            </div>

            <div className="relative my-4 flex h-56 w-full items-center justify-center rounded-3xl bg-gradient-to-br from-white/20 to-white/5">
              <div className="absolute h-40 w-40 rounded-full bg-yellow-300/20 blur-2xl" />
              <img
                src={pockemon.sprites.other["home"].front_default}
                alt={pockemon.name}
                className="z-10 h-52 w-52 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)] transition duration-500 hover:scale-110 hover:-rotate-6"
              />
            </div>

            <h2 className="text-4xl font-black capitalize tracking-wide text-white drop-shadow-md">
              {pockemon.name}
            </h2>

            <div className="mt-4 flex gap-3">
              {pockemon.types.map((item) => (
                <span
                  key={item.type.name}
                  className="rounded-full border border-white/20 bg-white/20 px-5 py-2 text-sm font-bold capitalize text-white shadow-lg backdrop-blur-md"
                >
                  {item.type.name}
                </span>
              ))}
            </div>

            <div className="mt-7 grid w-full grid-cols-3 gap-3">
              {types.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/10 px-2 py-4 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:bg-white/20"
                >
                  <p className="text-sm font-semibold text-white/70">
                    {item.emoji}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white/70">
                    {item.title}
                  </p>
                  <p className="mt-2 text-2xl font-black text-yellow-300">
                    {pockemon.stats[index].base_stat}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        onClick={showRandomPokemon}
        disabled={isLoading}
        className="z-10 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 px-10 py-4 text-lg font-black text-slate-950 shadow-xl shadow-yellow-500/20 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:from-yellow-300 hover:to-orange-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        🎲 Санамсаргүй Pokémon
      </button>

      <p className="z-10 text-xs font-medium tracking-widest text-white/40">
        CATCH THEM ALL!
      </p>
    </main>
  );
}
