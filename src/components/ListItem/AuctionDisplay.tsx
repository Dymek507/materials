
interface IAuctionDisplayProps {
  surcharge: number
  timeLeft?: string
  bid?: number | null
}

const AuctionDisplay = ({ surcharge, timeLeft, bid }: IAuctionDisplayProps) => {
  // Divide time string into hours, minutes and seconds
  const timeLeftArray = timeLeft?.split(':')
  const timeLeftDisplay = `${timeLeftArray?.[1]}:${timeLeftArray?.[2]}`

  switch (timeLeft) {
    case (""):
      return (
        <p>{surcharge}</p>
      )
    case ("-----"):
      return (
        <p>Start</p>
      )
    case ("Czas minął"):
      return (
        <p>End</p>
      )
    default:
      return (
        <div className="flex-col flex-center">
          <p>{bid && bid}</p>
          <p>{timeLeft ? timeLeftDisplay : null}</p>
        </div>
      )
  }
}

export default AuctionDisplay