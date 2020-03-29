import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MaterialMapView(props) {
  const [currentLatitude, setLatitude] = useState(0);
  const [currentLongitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(node => {
      setLatitude(node.coords.latitude);
      setLongitude(node.coords.longitude);

      fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + node.coords.latitude + "," + node.coords.longitude + "&type=hospital&radius=50000&key=AIzaSyDByeZVoaaLIG8uLYC5b054XCFHBX6mcts"
      )
        .then(data => {
          return data.json();
        })
        .then(res =>
          setLocations(
            res.results.map(marker => (
              <Marker
                key={marker.name}
                coordinate={{
                  latitude: marker.geometry.location.lat,
                  longitude: marker.geometry.location.lng
                }}
                title={marker.name}
              ></Marker>
            ))
          )
        );
    }, []);
  });

  return (
    <>
      <View style={[styles.container, props.style]}>
        <MapView
          customMapStyle={["undefined"]}
          style={styles.mapView1}
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude
            }}
            title={"My House"}
            description={"0 open beds"}
          ></Marker>
          {locations}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  mapView1: {
    flex: 1,
    backgroundColor: "rgb(230,230,230)"
  }
});

export default MaterialMapView;
