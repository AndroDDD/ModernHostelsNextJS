import { AmenitiesList } from "@/app/types/propertyData";
import { amenitiesPageDataNameAndIcons } from "@/app/constants/amenitiesPageDataNameAndIcons";

const generatePropertyPageAmenitiesList = (amenitiesList: AmenitiesList) => {
  let amenitiesPageDataArray = [];

  for (const amenity in amenitiesList) {
    if (amenitiesList[amenity]) {
      const foundPageDataAndIcon = amenitiesPageDataNameAndIcons.find(
        (amenityPageDataAndIcon: { itemName: string }) =>
          amenityPageDataAndIcon.itemName === amenity
      );

      if (foundPageDataAndIcon) {
        amenitiesPageDataArray.push(foundPageDataAndIcon);
      }
    }
  }

  return amenitiesPageDataArray;
};

export { generatePropertyPageAmenitiesList };
