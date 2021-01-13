import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleLikeRepositorie(id) {
    const response = await api.put(`repositories/${id}/likes`)
    
    const LikedRepositorie = response.data

    const repositorieUpdated = repositories.map(repositorie => {
      if (repositorie.id === id) {
        return LikedRepositorie;
      } else {
        return repositorie;
      }
    });
    setRepositories(repositorieUpdated)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      
      <SafeAreaView style={styles.container}>
       
      

            <FlatList
            data={repositories}
            keyExtractor={repositorie => repositorie.id}
            renderItem={({ item: repositorie }) => (
              
          

            <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repositorie.title}</Text> 
            <View style={styles.likesContainer}>
            <Text style={styles.tech}>{[repositorie.techs]}</Text>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repositorie.likes${repositorie.id}`}
            >
            <Text >{repositorie.likes}</Text>
            </Text>
          </View>
             
          <TouchableOpacity
          
            style={styles.button}
            onPress={() => handleLikeRepositorie(repositorie.id)}
          
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repositorie.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
          
        </View> 
           
            )}
           
            />
           {/*<FlatList
             data={repositories}
             keyExtractor={repositorie => repositorie.id}
             renderItem={({item: repositorie }) => (
               <Text style={styles.tech}>{repositorie.tasks}</Text>
             )}
             />*/}

           {/* <FlatList
             data={repositories}
             keyExtractor={repositorie => repositorie.id}
             renderItem={({item: repositorie }) => (
               <Text style={styles.tech}>{repositorie.id}</Text>
             )}
             /> */}

         
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    alignItems: 'center'
    
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
