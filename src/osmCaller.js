// given a pair of coordinates, use an Overpass query to find the name.
const getCityNameFromCoords = async (latitude, longitude) => {
    const overpassQuery = `
    [out:json];
    is_in(${latitude}, ${longitude}) -> .areas;
    (
      area.areas[border_type="city"];
      area.areas[border_type="town"];
      area.areas[border_type="township"];
    );
    area._["name"];
    out;
    `;

    // call the Overpass API
    
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson)
    
    if (responseJson.elements.length === 0) {
        console.log("City not found!")
        return "";
    }

    const city = responseJson.elements[0].tags;

    return city.name || "";
}

export {getCityNameFromCoords};
