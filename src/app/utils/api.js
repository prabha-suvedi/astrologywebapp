const API_BASE_URL = "http://localhost:5000"; // Change if API is on a different port

export async function fetchDailyHoroscope(sign) {
  try {
    const response = await fetch(`${API_BASE_URL}/zodiac/daily?sign=${sign}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return null;
  }
}
