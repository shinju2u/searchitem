import axios from 'axios';

const SPREADSHEET_ID = '1LZTefqIV00uYkqSN4B68tVSUuZysWH6Cr8f5g9qxpL8';
const RANGE = 'test'; // Adjust the range as needed

const fetchDataFromGoogleSheets = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract and return the values from the response
    return response.data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};

// Add a new function to handle access token retrieval
const getAccessToken = async () => {
  // Replace with your actual code for obtaining the access token
  // Make sure to use your client ID and client secret
  // This is a simplified example and might need adjustments depending on your chosen authentication method

  const response = await axios.post('https://oauth2.googleapis.com/token', {
    grant_type: 'client_credentials',
    client_id: '146875176001-eri8mod9drvphc7p58i7o49feqrkv64a.apps.googleusercontent.com',
    client_secret: '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',
  });

  return response.data.access_token;
};

// Use the access token within fetchDataFromGoogleSheets
const fetchAndProcessData = async () => {
  const accessToken = await getAccessToken();
  const data = await fetchDataFromGoogleSheets(accessToken);

  // Process and use the retrieved data
  console.log(data);
};

fetchAndProcessData();

export default fetchDataFromGoogleSheets;