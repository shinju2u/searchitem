import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,memo} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import { Table, Row, Rows } from 'react-native-table-component';
import fetchDataFromGoogleSheets  from './fetchDataFromGoogleSheets';





export default function App() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [table, setTable] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [matchedItem, setMatchedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromGoogleSheets();
        console.log('Data from Google Sheets:', data);       
        setTable(data)      
        // For example, set the first array as tableHead
        setTableHead(data[0]);   

        
      } catch (error) {
        console.error('Error in processing data:', error);
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that useEffect runs only once on mount


 
function handleSearch(searchTerm) {
  if (!searchTerm.trim()) {
    setMatchedItem(null);
    return;
  }

  const foundItem = table.slice(1).find((item) => item[1] === searchTerm);
  setMatchedItem(foundItem);
}

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

 return (
  
    <View style={styles.container}>
     <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="black" style={{ marginLeft: 1, marginRight: 4 }} />
     
      
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      </View>

      <View style={styles.container}>
      {matchedItem && (
  <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
    <Row data={tableHead} style={styles.head} textStyle={styles.headertext} />
    <Rows data={[matchedItem]} textStyle={styles.itemtext} />
  </Table>
)}
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
