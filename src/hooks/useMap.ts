import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {APIKEY} from '../constants/constants';
import {LocationGeocodedAddress, LocationGeocodedLocation} from 'expo-location';

function useMapHooks(ref: any) {
  useEffect(() => {
    Location.setGoogleApiKey(APIKEY);
    getCurrentPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState('');

  const onPressClearButton = () => {
    ref.current?.clear();
  };

  const getCurrentPosition = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      //   setErrorMsg('Permission to access location was denied');
      return;
    }

    await Location.getCurrentPositionAsync({}).then((location) => {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      onLocationChange({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    });
  };

  const onLocationChange = async (location: LocationGeocodedLocation) => {
    try {
      let json = await Location.reverseGeocodeAsync(location, {
        useGoogleMaps: true,
      });

      if (json) {
        let data: LocationGeocodedAddress = {
          city: null,
          district: null,
          streetNumber: null,
          street: null,
          region: null,
          subregion: null,
          country: null,
          postalCode: null,
          name: null,
          isoCountryCode: null,
          timezone: null,
        };
        json.forEach((item) => {
          if (item.name && !data.name) {
            data.name = item.name;
          }

          if (item.streetNumber && !data.streetNumber) {
            data.streetNumber = item.streetNumber;
          }

          if (item.street && !data.street) {
            data.street = item.street;
          }

          if (item.district && !data.district) {
            data.district = item.district;
          }

          if (item.city && !data.city) {
            data.city = item.city;
          }

          if (item.country && !data.country) {
            data.country = item.country;
          }
        });
        const addr = `${data.name}, ${data.streetNumber}, ${data.street}, ${data.district}, ${data.city}, ${data.country}`;
        setAddress(addr);
        ref.current?.setAddressText(addr);
      }
      //   onLocationChange(formatted_address);
    } catch (error) {
      console.log(error);
      setAddress('');
    }
  };

  const setLocationDetails = (details: any) => {
    const {geometry} = details;
    if (geometry) {
      setRegion({
        longitude: geometry.location.lng,
        latitude: geometry.location.lat,
      });
    }
  };

  const onMapMarkerDragEnd = (location: any) => {
    const reg = location.nativeEvent.coordinate;
    setRegion(reg);
    //onLocationChange(region);
  };

  return {
    region,
    setRegion,
    address,
    setAddress,
    onMapMarkerDragEnd,
    setLocationDetails,
    onLocationChange,
    onPressClearButton,
  };
}

export default useMapHooks;
