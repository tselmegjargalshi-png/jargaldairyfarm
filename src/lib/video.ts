/** Returns a privacy-friendly YouTube embed URL, or null when the URL is not YouTube. */
export function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (u.hostname.endsWith("youtube.com")) {
      id = u.searchParams.get("v") ?? "";
      if (!id) {
        const m = u.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})/);
        id = m?.[1] ?? "";
      }
    }
    return /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
