import { AmenitiesList } from "@/app/types/propertyData";
import { amenitiesPageDataNameAndIcons } from "@/app/constants/amenitiesPageDataNameAndIcons";

const generatePropertyPageAmenitiesList = (amenitiesList: AmenitiesList) => {
  let amenitiesPageDataArray = [];

  for (const amenity in amenitiesList) {
    if (amenitiesList[amenity]) {
      amenitiesPageDataArray.push(
        amenitiesPageDataNameAndIcons.find(
          (amenityPageDataAndIcon: { itemName: string }) =>
            amenityPageDataAndIcon.itemName === amenity
        )
      );
    }
  }

  return amenitiesPageDataArray;
};

export { generatePropertyPageAmenitiesList };
