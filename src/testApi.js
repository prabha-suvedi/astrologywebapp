import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env.local file

// Ensure the clientId and clientSecret are available from the environment
const clientId = process.env.PROKERALA_CLIENT_ID;
const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

export const getAccessToken = async () => {
    try {
        const response = await axios.post('https://api.prokerala.com/token', 
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,  // Use clientId from .env
                client_secret: clientSecret,  // Use clientSecret from .env
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};

// Fetch horoscope data based on the zodiac sign
export const fetchHoroscope = async (sign) => {
    try {
        const token = await getAccessToken(); // Fetch access token
        if (!token) throw new Error("Access token could not be retrieved.");

        // Make the API request to fetch the horoscope
        const response = await axios.get(
            `https://api.prokerala.com/v2/horoscope/daily/${sign}`, // Pass the zodiac sign in the URL
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Using Bearer token for auth
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data || !response.data.data) {
            throw new Error("Invalid horoscope data received.");
        }

        console.log('Horoscope:', response.data.data.description); // Log horoscope
        return response.data.data.description || "Horoscope data not found."; // Return the horoscope description

    } catch (error) {
        console.error("❌ Error fetching horoscope:", error.response?.data || error.message);
        return "Could not fetch horoscope. Try again later."; // Return a fallback message
    }
};

// Test the function with the 'aries' sign
const testHoroscope = async () => {
    const horoscope = await fetchHoroscope('aries');
    console.log('Horoscope for Aries:', horoscope);
};

testHoroscope();
