'use server';

import AnimeCard, { AnimeProp } from '@/components/AnimeCard';
import axios from 'axios';

export const fetchAnime = async (page: number) => {
  const { data } = await axios.get(
    `https://shikimori.one/api/animes?page=${page}&limit=12&order=popularity`
  );

  console.log(data);
  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};
