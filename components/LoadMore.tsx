'use client';
import { fetchAnime } from '@/app/action';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export type AnimeCard = JSX.Element;

function LoadMore() {
  const [data, setData] = useState<AnimeCard[]>([]);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView) {
      (async () => {
        const resData = await fetchAnime(page);
        setData([...data, ...resData]);
        setPage((page) => page + 1);
      })();
    }
  }, [inView, data, page]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
