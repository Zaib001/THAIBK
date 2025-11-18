// wrapper for backend API call
export async function translateAPI(text: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sola/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return res.json();
}
