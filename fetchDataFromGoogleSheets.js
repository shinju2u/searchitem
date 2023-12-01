import axios from 'axios';

const SPREADSHEET_ID = '1LZTefqIV00uYkqSN4B68tVSUuZysWH6Cr8f5g9qxpL8';
const RANGE = 'test'; // Adjust the range as needed
const APIKEY= "AIzaSyDlZNHVAQcvBwcjZqKaPyxfvee8q-ms6Rc"

const fetchDataFromGoogleSheets = async () => {
  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${APIKEY}`,
    
    );

    // Extract and return the values from the response
    return response.data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
console.log('googleSheetsApi.js is executed');
export default fetchDataFromGoogleSheets;





