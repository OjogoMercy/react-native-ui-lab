import images from "./images";

export type Destination = {
  key: string;
  title: string;
  poster: any;
  backdrop: any;
  rating: number;
  genres: string[];
  description: string;
};

const database: Destination[] = [
  {
    key: "thailand",
    title: "Thailand",
    poster: images.thailand,
    backdrop: images.thailand,
    rating: 4.8,
    genres: ["Beach", "Culture", "Food"],
    description:
      "From the bustling streets of Bangkok to serene temples and crystal-clear waters, Thailand is a sensory adventure like no other.",
  },
  {
    key: "nigeria",
    title: "Nigeria",
    poster: images.nigeria,
    backdrop: images.nigeria,
    rating: 4.5,
    genres: ["Culture", "Wildlife", "Nightlife"],
    description:
      "Africa's most populous nation pulses with energy — rich traditions, vibrant music, diverse cuisine, and landscapes that stretch from coast to savannah.",
  },
  {
    key: "scotland",
    title: "Scotland",
    poster: images.scotland,
    backdrop: images.scotland,
    rating: 4.7,
    genres: ["Highlands", "History", "Adventure"],
    description:
      "Rugged highlands, ancient castles, and misty lochs make Scotland one of Europe's most dramatic and romantic destinations.",
  },
  {
    key: "nairobi",
    title: "Nairobi",
    poster: images.nairobi,
    backdrop: images.nairobi,
    rating: 4.6,
    genres: ["Safari", "Wildlife", "Urban"],
    description:
      "The only city in the world with a national park on its doorstep. Nairobi blends a thriving tech scene with unmatched wildlife experiences.",
  },
  {
    key: "australia",
    title: "Australia",
    poster: images.australia,
    backdrop: images.australia,
    rating: 4.9,
    genres: ["Adventure", "Beach", "Nature"],
    description:
      "From the Great Barrier Reef to the vast Outback and golden beaches, Australia offers an endless playground for the curious traveller.",
  },
  {
    key: "china",
    title: "China",
    poster: images.china,
    backdrop: images.china,
    rating: 4.7,
    genres: ["History", "Culture", "Scenic"],
    description:
      "A civilisation spanning thousands of years — the Great Wall, ancient temples, modern megacities, and breathtaking mountain landscapes all in one country.",
  },
  {
    key: "japan",
    title: "Japan",
    poster: images.japan,
    backdrop: images.japan,
    rating: 4.9,
    genres: ["Culture", "Food", "Scenic"],
    description:
      "Where ancient tradition meets cutting-edge modernity. Cherry blossoms, bullet trains, ramen alleys, and peaceful shrines await in Japan.",
  },
  {
    key: "france",
    title: "France",
    poster: images.france,
    backdrop: images.france,
    rating: 4.8,
    genres: ["Romance", "Art", "Food"],
    description:
      "The Eiffel Tower, Loire Valley châteaux, world-class cuisine, and the French Riviera — France is the benchmark of art, culture, and elegance.",
  },
  {
    key: "london",
    title: "London",
    poster: images.london,
    backdrop: images.london,
    rating: 4.6,
    genres: ["History", "Urban", "Culture"],
    description:
      "A city that never stands still. From the Thames and Tower Bridge to world-class museums and a buzzing food scene, London has something for everyone.",
  },
];

export default database;
