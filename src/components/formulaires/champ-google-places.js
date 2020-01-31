import scriptLoader from "react-async-script-loader";
import React from "react"
import { Search } from "semantic-ui-react";

import CONFIG from "../../config.json"
const PLACES_URL = "https://maps.googleapis.com/maps/api/js?"
                 + "key=" + CONFIG.google.maps.APIKEY + "&"
                 + "libraries=places"
                 ;

/* global google */

class ChampGooglePlaces extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valeur: props.valeurInitiale,
      placeSélectionnée: null,
      résultats: null,
      enCharchement: false
    };
  }

  render() {
    return <Search
      isLoading={this.state.enCharchement}
      onSearchChange={this.rechercheChangee}
      onResultSelect={this.resultatSelectionne}
      onFocus={this.rechercheChangee}
      results={this.state.résultats}
      value={this.state.valeur}
      {...this.props}
    />
  }

  rechercheChangee = (e, {value}) => {
    const rechercheValide = value.length > 0;

    this.setState({
      enCharchement: rechercheValide,
      valeur: value
    });

    if(this.props.auChangement) {
      this.props.auChangement(value, null);
    }

    if(rechercheValide) {
      new google.maps.places.AutocompleteService().getPlacePredictions(
        {input: value},
        this.rechercheChargee
      );
    }
  };

  rechercheChargee = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return; // on laisse "loader" sans rien faire
    }

    let résultats = predictions.map(prediction => {
      return {
        key: prediction.id,
        title: prediction.structured_formatting.main_text,
        description: prediction.structured_formatting.secondary_text,
        place_id: prediction.place_id
      };
    });

    this.setState({
      enCharchement: false,
      résultats: résultats
    });
  };

  resultatSelectionne = (e, { result }) => {
    this.setState({
      valeur: result.title,
      placeSélectionnée: result
    });

    if(this.props.auChangement) {
      this.props.auChangement(result.title, result);
    }

    let fauxConteneur = document.createElement("div");

    new google.maps.places.PlacesService(fauxConteneur).getDetails({
      placeId: result.place_id,
      fields: ["formatted_address"]
    }, this.auDetailsCharges)
  };

  auDetailsCharges = (place, status) => {
    if(status !== google.maps.places.PlacesServiceStatus.OK) {
      return; // on laisse l'adresse non-formattée
    }

    this.setState({
      valeur: place.formatted_address
    });

    if(this.props.auChangement) {
      this.props.auChangement(place.formatted_address, place);
    }
  };
}

export default scriptLoader([PLACES_URL])(ChampGooglePlaces);