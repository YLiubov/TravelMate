// This service is the shared place for frontend HTTP requests.
export async function getJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  // `const` keeps this response binding fixed; its object can still be read below.
  // `path` is an API endpoint, for example /api/countries.
  // fetch uses GET by default; the Response has the server status and JSON body (ответ).
  // Protected endpoints use a Bearer token in Authorization; these public GETs need no token.
  const response = await fetch(path, { signal });

  // Do not treat a 404/500 response like successful data.
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${path}`);
  }

  // `await` waits for the response body; the generic type tells TypeScript what shape to expect.
  // This TypeScript assertion describes the expected JSON shape; it does not validate the server data.
  return response.json() as Promise<T>;
}
