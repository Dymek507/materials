import { IconButton } from "@mui/material";
import { IProduct } from "../../types/model"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../../components/AlertDialog";
import deleteProduct from "../../utils/productUtils/deleteProduct";

type InfoSectionProps = {
  productData: IProduct
  distance: number
  handleEdit: () => void
}

const InfoSection = ({ productData, distance, handleEdit }: InfoSectionProps) => {
  const { id, company, material, category, price } = productData

  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const deleteCompanyHandler = () => {
    deleteProduct(id)
    navigate('/products')
  }

  return (
    <section>
      <AlertDialog open={showModal} onClose={() => setShowModal(false)} callbackFn={deleteCompanyHandler} />
      <div className="">
        <h1 className='self-start p-2 mb-4 mr-8 text-3xl font-bold border-b-4 border-black'>{material}
        </h1>
      </div>
      <div className="flex justify-end mb-8 mr-8">
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setShowModal(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="flex-col text-xl flex-center">
        {category?.[0] !== "" ? <h1 className='mb-2 text-3xl'>{category}</h1> : null}
        <h2>{company}</h2>
        <h2>{price} zł</h2>
        <h2>{distance.toFixed(2)} km</h2>
        <h1>{(price + distance * 0.65).toFixed(2)} zł</h1>
      </div>
    </section>
  )
}

export default InfoSection