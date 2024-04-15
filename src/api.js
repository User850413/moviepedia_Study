export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 5,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/2525/film-reviews?${query}`
  );
  const result = await response.json();
  return result;
}
