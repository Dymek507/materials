import { Cords } from "../../types/model";

const accurateDistance = async (start: Cords, end: Cords): Promise<number> => {
  if (!start || !end) return 0;
  const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${
    start.lat + "," + start.lng
  }&destinations=${
    end.lat + "," + end.lng
  }&travelMode=driving&key=Ai_BZ9url52vzFfpAgssUNh7suy-R8y726zoLL_pgt8k7cE5u7ypi20MInzvwC71`;
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.resourceSets[0].resources[0].results[0].travelDistance)
    .catch((err) => console.log(err));

  return response;
};

export default accurateDistance;
