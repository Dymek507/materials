import { IconButton } from "@mui/material";
import { ICompany } from "../../types/model"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GridOnIcon from '@mui/icons-material/GridOn';
import { deleteCompany } from "./helpers/deleteCompany";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertDialog from "../../components/AlertDialog";

type InfoSectionProps = {
  companyData: ICompany
  distance: number
  handleEdit: () => void
  handleImport: () => void
}


const InfoSection = ({ companyData, distance, handleEdit, handleImport }: InfoSectionProps) => {
  const { id, company, phone, mail, person, comment, category, siding, date } = companyData

  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const deleteCompanyHandler = () => {
    deleteCompany(id)
    navigate('/companies')
  }

  return (
    <section className="h-1/2">
      <AlertDialog open={showModal} onClose={() => setShowModal(false)} callbackFn={deleteCompanyHandler} />
      <div className="">
        <h1 className='self-start p-2 mb-4 mr-8 text-3xl font-bold border-b-4 border-black'>{company}
        </h1>
      </div>
      <div className="flex justify-end mb-8 mr-8">
        <IconButton onClick={handleImport}>
          <GridOnIcon />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setShowModal(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="flex-col text-xl flex-center">
        <h1>{phone}</h1>
        <h1>{mail}</h1>
        <h1>{date ?? ""}</h1>
        <h1>{person}</h1>
        <h1>{comment}</h1>
        <h1>{category && category[0] === "kruszywo" ? siding : null}</h1>
        <h1 className='mt-8'>{distance.toFixed(2)} km</h1>
      </div>
    </section>
  )
}

export default InfoSection