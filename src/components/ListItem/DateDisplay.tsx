
const DEFAULT_DATE = '0000-00-00 00:00:00'
const days = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', "Pią", "Sob"]

const DateDisplay = ({ dateString }: { dateString: string }) => {
  let dateStringDisplay = DEFAULT_DATE

  if (dateString !== "" && dateString !== undefined) {
    dateStringDisplay = dateString
  }
  const dateAndTimeArr = dateStringDisplay.split(' ')
  const dateArr = dateAndTimeArr[0].split('-')
  const day = new Date(dateStringDisplay).getDay()
  // if(dateAndTimeArr[1] === undefined) return (<p>Brak godziny</p>)
  // const timeArr = dateAndTimeArr[1].split(':')



  return (
    <div className='flex-col border-2 border-black flex-center'>
      <div className='text-[1.3em]'>{dateArr[2]}</div>
      {!!day && <div>{days[day]}</div>}
      <div className='text-[0.6em]'>{dateArr[1] + "-" + dateArr[0]}</div>
    </div>
  )
}

export default DateDisplay