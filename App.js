import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import fetchDataFromGoogleSheets from './fetchDataFromGoogleSheets';


const tableHead = ["Name","quantity","price"]
const mockData = ['Book', 'pen', 'Bottle'];

 const searchFunction = (searchTerm) => { 

  if (!searchTerm.trim()) {
    // If the search term is empty or contains only whitespace, return an empty array
    return [];
  }

  const filteredData = mockData.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredData;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState(''); 




  // const handleSearch = async () => {
  //   try {
  //     // Retrieve the access token from Google Sign-In (you need to implement this)
  //     const accessToken = await getGoogleSignInAccessToken();

  //     // Fetch data from Google Sheets
  //     const data = await fetchDataFromGoogleSheets(accessToken);

  //     // Implement your search logic here
  //     const results = data.filter(item =>
  //       item.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //     setSearchResults(results);
  //   } catch (error) {
  //     console.error('Error during search:', error);
  //   }
  // };



  const SearchComponent = () => {
    const searchResults=searchFunction(searchTerm)

    const tableData = searchResults.map(item => [item]);
    
    return (
      <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headertext} />
        <Rows data={tableData} textStyle={styles.itemtext} />
      </Table>
    </View>
    );
  };


 return (
  
    <View style={styles.container}>
     <View style={styles.searchContainer}>
      <Feather
       name = "search"
       size= {20}
       color ="black"
       style = {{marginLeft:1 , marginRight: 4}}/>      
      
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      </View>

      <View>
        <SearchComponent />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 5,
    margin: 10,
  },
  textInput: { flex: 1, height: 40 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  headertext: { margin: 6, fontWeight: 'bold' },
  itemtext: { margin: 6 },
});
