import DeleteIcon from '@mui/icons-material/Delete';

interface IToolboxProps {
  deleteCargos: () => void
}


const Toolbox = ({ deleteCargos }: IToolboxProps) => {

  return (
    <div className='fixed bottom-0 w-72 h-20 left-[50vw-9rem] rounded-t-xl bg-gradient-to-r from-green-500 to-green-700 animate-slidey'>
      <div className='w-full h-full flex-center'>
        <DeleteIcon className='text-4xl text-white' onClick={deleteCargos} />
      </div>
    </div>
  )
}

export default Toolbox