export async function fetchHomePageSettings(restUrl: string) {
  try {
    const restUrlResponse = await fetch(restUrl);
    const json = await restUrlResponse.json();

    console.log({ json });

    return json;
  } catch (e) {
    console.error("Error fetching homepage settings:", e);
    return null;
  }
}
