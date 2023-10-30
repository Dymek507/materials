import { ICompany } from "../../types/model"

type InfoSectionProps = {
  companyData: ICompany
  distance: number
  handleEdit: () => void
}

const InfoSection = ({ companyData, distance, handleEdit }: InfoSectionProps) => {
  const { company, phone, mail, person, comment, category, siding } = companyData
  return (
    <section>
      <div className="bg-red-300">
        <h1 className='self-start pb-2 mb-4 text-xl border-b-2 border-black'>{company}
        </h1>
      </div>
      <div className="flex-col bg-blue-500 flex-center">
        <h1>{phone}</h1>
        <h1>{mail}</h1>
        <h1>{person}</h1>
        <h1>{comment}</h1>
        <h1>{category && category[0] === "kruszywo" ? siding : null}</h1>
        <button onClick={handleEdit}>Edit</button>
        <h1 className='mt-8'>{distance.toFixed(2)} km</h1>
      </div>
    </section>
  )
}

export default InfoSection