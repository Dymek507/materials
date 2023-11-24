import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

type OptionsType = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  defaultCategories?: string[];
  selectCategories: (e: any) => void;
}

const stringArrayToOptionArray = (categoryArray: string[]) => {
  if (!categoryArray) return
  // console.log(categoryArray)
  return categoryArray.map(item => ({
    value: item,
    label: item
  }))
}

const MultiSelect = ({ defaultCategories = [], selectCategories }: MultiSelectProps) => {

  const [selectOptions, setSelectOptions] = useState<OptionsType[]>([]);

  const selectHandler = (e: readonly OptionsType[]) => {
    const categoriesArray = e.map(item => item.value)
    selectCategories(categoriesArray);
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoriesRef = collection(db, "categories")

      const categoriesSnap = await getDocs(categoriesRef);
      const categoriesList = [] as OptionsType[];

      categoriesSnap.forEach((doc) => {
        categoriesList.push(
          {
            value: doc.data().key,
            label: doc.data().name
          }
        );
      });
      setSelectOptions(categoriesList);
    }
    getCategories();
  }
    , [])

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'transparent',
      marginTop: '17px',
      width: '100%',
      height: 55,
      minHeight: 55,
    }),
  };

  return (
    <CreatableSelect isMulti options={selectOptions} onChange={e => selectHandler(e)} styles={selectStyles} defaultValue={stringArrayToOptionArray(defaultCategories)} className='z-10' />
  );
}

export default MultiSelect