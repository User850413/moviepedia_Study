export async function getReviews({ order = "createdAt", limit = 5 }) {
  const query = `order=${order}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/2525/film-reviews?${query}`
  );
  console.log(limit);
  const result = await response.json();
  return result;
}
