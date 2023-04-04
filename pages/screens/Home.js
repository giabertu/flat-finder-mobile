import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { styles } from '../../styles'
import TicketCard from "../../components/TicketCard";
import FavListingCard from "../../components/FavListingCard";
import OwnListingCard from "../../components/OwnListingCard";
import { SafeAreaView, SectionList } from "react-native";

export default function Home({
  navigation,
  route,
  tickets,
  ownListings,
  favListings,
  loading,
  fetchData,
}) {
  favListings = favListings.map((item) => item.listing);

  const [refreshing, setRefreshing] = useState(false);

  const DATA = [
    {
      title: "Saved Listings",
      data: favListings,
    },
    {
      title: "Own Listings",
      data: ownListings,
    },
    {
      title: "My Tickets",
      data: tickets,
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading)
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionFooter={({ section }) => {
          if (section.data.length === 0) {
            return <Text>No data D:</Text>;
          }
        }}
        renderItem={({ section, item, setTickets, tickets }) => {
          // console.log(prop)
          console.log(section.title, section.data.length);
          if (section.title === "Saved Listings") {
            return <FavListingCard item={item} />;
          } else if (section.title === "Own Listings") {
            return <OwnListingCard item={item} />;
          } else {
            return (
              <TicketCard
                item={item}
                setTickets={setTickets}
                tickets={tickets}
              />
            );
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
