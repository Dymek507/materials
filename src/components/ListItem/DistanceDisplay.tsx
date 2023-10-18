import { ICargo } from '../../types/model'

const DistanceDisplay = ({ cargo }: { cargo: ICargo }) => {
  const cargoType = () => {
    switch (cargo.type) {
      case "Naczepa std. 13,6m - bez plandeki":
        return "standard"
      case "Naczepa std. 13,6m - plandeka":
        return "standard"
      case "Naczepa standard":
        return "standard"
      case undefined:
        return "standard"
      default:
        return cargo.type
    }
  }
  return (
    <div className='flex-col flex-center'>
      <p>
        {cargo.distance}
      </p>
      <p className='text-xs'>{cargoType()}</p>
    </div>
  )
}

export default DistanceDisplay