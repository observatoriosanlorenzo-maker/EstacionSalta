export default function WindyEmbed({ lat, lon, zoom }) {
  const windyUrl =
    process.env.NEXT_PUBLIC_WINDY_EMBED_URL ||
    `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&level=surface&overlay=wind`;

  return (
    <iframe
      width="100%"
      height="450"
      frameBorder="0"
      src={windyUrl}
    />
  );
}

