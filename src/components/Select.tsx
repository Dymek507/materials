import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ICategory } from '../types/model';

type MultiSelectProps = {
  selectCategories: (e: string) => void;
  defaultValue?: string;
}

const SingleSelect = ({ selectCategories, defaultValue }: MultiSelectProps) => {

  const [selectOptions, setSelectOptions] = useState<ICategory[]>([]);
  const [option, setOption] = useState<string>(defaultValue ?? "");

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRef = collection(db, "categories")

      const categoriesSnap = await getDocs(categoriesRef);
      const categoriesList = [] as ICategory[];

      categoriesSnap.forEach((doc) => {
        categoriesList.push(
          doc.data() as ICategory
        )
      });
      setSelectOptions(categoriesList);
    }
    getCategories();
  }
    , [])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    selectCategories(event.target.value as string)
    setOption(event.target.value as string)
  }

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Kategoria"
      value={option}
      onChange={handleChange}
      className='w-full'
    >
      {selectOptions.map((item) => (
        <MenuItem key={item.key} value={item.key}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SingleSelect