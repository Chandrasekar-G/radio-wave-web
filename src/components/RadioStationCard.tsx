"use client";
import { setStation } from "@/store/features/playerSlice";
import { useAppDispatch } from "@/store/hooks";
import { IStation } from "@/types";
import Image from "next/image";

interface Props {
  station: IStation;
}

function RadioStationCard(props: Props) {
  const dispatch = useAppDispatch();
  const { station } = props;

  const setCurrentStation = () => {
    dispatch(setStation(station));
  };

  return (
    <>
      {station && (
        <div className="flex p-3 flex-col bg-graybg w-[256px] h-[356px] max-h-[256px] rounded-2xl shadow-xl shadow-slate-300/60 m-3">
          <Image
            alt="station favicon"
            className="aspect-video w-[256px] h-[256px] rounded-t-2xl object-cover object-center"
            src={station.favicon}
          />

          <div className="p-4">
            <p className="text-blue-400 text-base font-medium">
              {station.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RadioStationCard;
