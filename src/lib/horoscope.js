import axios from "axios";

export async function fetchHoroscope(sign) {
  try {
    const response = await axios.get(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, { method: "POST" });
    return response.data;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return null;
  }
}
