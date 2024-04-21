import { IStation } from "@/types";
import RadioStationCard from "./RadioStationCard";

interface Props {
  stations: IStation[] | undefined;
}

function RadioStationList(props: Props) {
  const { stations } = props;
  return (
    <div className="flex flex-wrap w-full">
      {stations?.map((station) => (
        <RadioStationCard key={station.changeuuid} station={station} />
      ))}
    </div>
  );
}

export default RadioStationList;
