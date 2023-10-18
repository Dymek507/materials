import React, { useEffect } from "react"
import { ICargo } from "../../types/model"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase"

interface StateProps {
  cargo: ICargo
}

const State = ({ cargo }: StateProps) => {
  const { state, timeStamp } = cargo
  const [stateColor, setStateColor] = React.useState('' as string)
  const actualTimeStamp = Date.now()
  const timeDiff = actualTimeStamp - Number(timeStamp)

  useEffect(() => {
    if (timeDiff > 1000 * 60 * 2) {
      const updateState = async () => {
        const cargoRef = doc(db, "cargos", cargo.id)
        await updateDoc(cargoRef, {
          state: "expired"
        });
      }
      updateState()
    }
  }, [cargo])



  useEffect(() => {
    switch (state) {
      case 'active':
        setStateColor('green')
        break;
      case 'expired':
        setStateColor('red')
        break;
      default:
        setStateColor('yellow')
        break;
    }
  }, [state])

  return (
    <div className='flex-center w-5 h-5 rounded-full text-[0.8em]' style={{ backgroundColor: stateColor }}></div>
  )
}

export default State