export const getAnime = async ({ weekday }) => {
  const res = await fetch(
    `https://api.jikan.moe/v4/schedules?filter=${weekday}`,
  );
  const { data } = await res.json();
  const broadcasts = await data.map((anime) => ({
    title: anime.title,
    image: anime.images.webp.large_image_url,
    broadcast: anime.broadcast,
    score: anime.score,
    score_by: anime.score_by,
    genres: anime.genres,
  }));
  return broadcasts;
};
