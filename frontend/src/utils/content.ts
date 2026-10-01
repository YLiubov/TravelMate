import type { LanguageCode, LocalizedInfo } from "../types";

// Pick the selected translation; fall back to English and then to the first available entry.
export function localizedInfo(infos: LocalizedInfo[], language: LanguageCode) {
  return (
    infos.find((info) => info.language?.code === language) ??
    infos.find((info) => info.language?.code === "en") ??
    infos[0]
  );
}

export function flagEmoji(countryCode: string) {
  // map iterates through the two country-code letters and turns each into a flag symbol.
  return countryCode
    .toUpperCase()
    .split("")
    .map((letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

export function readableSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function mapEmbedUrl(latitude: number, longitude: number) {
  const delta = 0.04;
  const bounds = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bounds)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
}
