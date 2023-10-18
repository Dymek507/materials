import { ILocation } from "../../types/model"

interface PlaceDisplayProps {
  placeData: ILocation
}

const PlaceDisplay = ({ placeData }: PlaceDisplayProps) => {
  return (
    <div className='flex-col flex-center'>
      <p>
        {placeData.zipCode}
      </p>
      <p className="text-[1.2em] font-bold capitalize">
        {placeData.city}
      </p>
      <p className='text-center text-[0.7em]'>
        {placeData.voivodeship?.slice(0, 12)}
      </p>
    </div>
  )
}

export default PlaceDisplay