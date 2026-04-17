"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import { gamesLibrary } from "@/lib/gamesData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function TopRated() {
  // Sort and filter by rating (highest first)
  const topRatedGames = gamesLibrary
    .filter((game) => game.rating >= 9.0)
    .sort((a, b) => b.rating - a.rating);

  const [games] = useState(topRatedGames);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYearRange, setSelectedYearRange] = useState("All");
  const [selectedDeveloper, setSelectedDeveloper] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState({
    genre: false,
    year: false,
    dev: false,
  });

  // 🎮 Popular Genres
  const popularGenres = [
    "All",
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Horror",
    "Interactive Drama",
    "Sports",
    "Racing",
  ];

  // 📅 Year Ranges
  const yearRanges = [
    { label: "All", min: 0, max: 9999 },
    { label: "2000–2005", min: 2000, max: 2005 },
    { label: "2006–2010", min: 2006, max: 2010 },
    { label: "2011–2015", min: 2011, max: 2015 },
    { label: "2016–2020", min: 2016, max: 2020 },
    { label: "2021–2025", min: 2021, max: 2025 },
  ];

  // 🧠 Unique Developers (FIXED TYPE ISSUE BUT SAME LOGIC)
  const developers = [
    "All",
    ...Array.from(
      new Set(
        gamesLibrary
          .flatMap((g) =>
            Array.isArray(g.developer) ? g.developer : [g.developer]
          )
          .filter(Boolean)
      )
    ),
  ];

  // 🕹️ Filter Logic (FIXED undefined crash ONLY)
  const filteredGames = games.filter((game) => {
    const matchGenre =
      selectedGenre === "All" || game.genre.includes(selectedGenre);

    const matchRange =
      yearRanges.find((range) => range.label === selectedYearRange) ||
      yearRanges[0];

    const matchYear =
      selectedYearRange === "All" ||
      (game.release_year >= matchRange.min &&
        game.release_year <= matchRange.max);

    const matchDeveloper =
      selectedDeveloper === "All" || game.developer === selectedDeveloper;

    return matchGenre && matchYear && matchDeveloper;
  });

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white">
      {/* 🌄 Hero Section with Gradient Effect */}
      <div className="relative w-full">
        <div className="relative w-full h-[280px] md:h-[350px] overflow-hidden">
          <Image
            src="https://i.redd.it/sr520hah2o541.jpg"
            alt="Top Rated Games"
            fill
            className="object-cover object-top"
            priority
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(28,28,28,0.95))",
            }}
          />

          <div className="hidden md:flex absolute inset-0 flex-col justify-center px-6 md:px-12 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-2xl">
              Top Rated Games
            </h1>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl drop-shadow-lg">
              Discover the highest-rated masterpieces loved by players around the world.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1c1c1c] to-transparent pointer-events-none" />
        </div>

        <div className="md:hidden bg-[#1c1c1c] px-6 py-6">
          <h1 className="text-3xl font-bold mb-3 text-white">
            Top Rated Games
          </h1>
          <p className="text-gray-300 text-base">
            Discover the highest-rated masterpieces.
          </p>
        </div>
      </div>

      {/* 🧩 Page Content */}
      <div className="max-w-[1400px] mx-auto py-12 px-4">
        <p className="text-gray-400 mb-8 text-lg">
          Browse the highest-rated games (Rating 9.0+) — {filteredGames.length} found
        </p>

        {/* 🔥 Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          {/* Genre */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen((p) => ({ ...p, genre: !p.genre }))
              }
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Genre: {selectedGenre}
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen.genre && (
                <motion.ul className="absolute z-20 mt-2 w-44 bg-[#2a2a2a] rounded-xl">
                  {popularGenres.map((genre) => (
                    <li
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre);
                        setDropdownOpen((p) => ({ ...p, genre: false }));
                      }}
                      className="px-4 py-2 cursor-pointer"
                    >
                      {genre}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Year */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen((p) => ({ ...p, year: !p.year }))
              }
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Year: {selectedYearRange}
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen.year && (
                <motion.ul className="absolute z-20 mt-2 w-44 bg-[#2a2a2a] rounded-xl">
                  {yearRanges.map((range) => (
                    <li
                      key={range.label}
                      onClick={() => {
                        setSelectedYearRange(range.label);
                        setDropdownOpen((p) => ({ ...p, year: false }));
                      }}
                      className="px-4 py-2 cursor-pointer"
                    >
                      {range.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Developer */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen((p) => ({ ...p, dev: !p.dev }))
              }
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              Developer: {selectedDeveloper}
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen.dev && (
                <motion.ul className="absolute z-20 mt-2 w-56 bg-[#2a2a2a] rounded-xl">
                  {developers.map((dev) => (
                    <li
                      key={dev}
                      onClick={() => {
                        setSelectedDeveloper(dev);
                        setDropdownOpen((p) => ({ ...p, dev: false }));
                      }}
                      className="px-4 py-2 cursor-pointer"
                    >
                      {dev}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div key={game.id} layout>
                <GameCard game={game} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
