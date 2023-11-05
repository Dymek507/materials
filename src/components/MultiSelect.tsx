import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

type OptionsType = {
  value: string;
  label: string;
};

const MultiSelect = () => {

  const [selectOptions, setSelectOptions] = useState<OptionsType[]>([]);

  const selectHandler = (e: any) => {
    console.log(e);
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

  return (
    <CreatableSelect isMulti options={selectOptions} onChange={e => selectHandler(e)} />
  );
}

export default MultiSelect