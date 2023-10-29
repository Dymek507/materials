const getCords = async (adress: string) => {
  const url = `https://dev.virtualearth.net/REST/v1/Locations?query={${adress}}&maxResults=1&key=Ai_BZ9url52vzFfpAgssUNh7suy-R8y726zoLL_pgt8k7cE5u7ypi20MInzvwC71`;
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.resourceSets[0].resources[0].point.coordinates)
    .catch((err) => console.log(err));

  if (!response) return { lat: 0, lng: 0 };
  return {
    lat: response[0],
    lng: response[1],
  };
};

export default getCords;
