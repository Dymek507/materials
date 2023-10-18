import React, { useEffect, useMemo } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import ListItem from '../ListItem/RootListItem'
import InfoModal from '../InfoModal/InfoModal'
import { db } from "../../../firebase"
import TablerHeader from './TablerHeader';
import Toolbox from './Toolbox';
import sortCargos, { SortingVariants } from './helpers/sortCargos';
import { IProduct } from '../../types/model';

// const sortOptions: { label: string, type: SortingVariants }[] = [
//   { label: "price", type: SortingVariants.price },
//   { label: "loadDate", type: SortingVariants.loadingDate },
// ];

const List = () => {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState({} as IProduct);
  const [productList, setProductList] = React.useState<IProduct[]>([])
  const [selectedIDs, setSelectedIDs] = React.useState<string[]>([])
  const [showToolbox, setShowToolbox] = React.useState(false)
  const [sortingAtr, setSortingAtr] = React.useState<SortingVariants>(SortingVariants.loadingDate)
  const [sortingDir, setSortingDir] = React.useState<boolean>(true)

  const listItems = useMemo(
    () => sortCargos(productList, sortingAtr, sortingDir),
    [productList, sortingAtr, sortingDir])

  const productsRef = collection(db, "products");

  useEffect(() => {
    const unsub = onSnapshot(productsRef, (products) => {
      const firebaseProductsList = [] as IProduct[]
      products.forEach((product) => {
        firebaseProductsList.push(product.data() as IProduct)
      });
      setProductList(firebaseProductsList)
    });
    return () => {
      unsub()
    }
  }, [])

  //Show toolbox if there is at least one cargo selected
  useEffect(() => {
    if (selectedIDs.length > 0) {
      setShowToolbox(true)
    } else {
      setShowToolbox(false)
    }
  }, [selectedIDs])


  const openModal = (product: IProduct) => {
    setProduct(product)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }
  const addToSelectedArrayIds = (id: string) => {
    const newSelectedArray = [...selectedIDs]
    if (newSelectedArray.includes(id)) {
      const index = newSelectedArray.indexOf(id)
      newSelectedArray.splice(index, 1)
    } else {
      newSelectedArray.push(id)
    }
    setSelectedIDs(newSelectedArray)
  }

  const deleteCargos = () => {
    selectedIDs.forEach(async (id) => {
      const cargoRef = doc(db, "cargos", id)
      await deleteDoc(cargoRef);
    })
    setSelectedIDs([])
  }

  const handleSorting = (sortingAtr: SortingVariants, sortingDir: boolean) => {
    setSortingAtr(sortingAtr)
    setSortingDir(sortingDir)
  }

  console.log(listItems)

  return (
    <div className="flex flex-col gap-3 xl:gap-6 wh-full sm:p-4 xl:px-10 xl:pt-0 bg-gradient-to-r from-blue-400 to-blue-600 flex-center">
      {/* <InfoModal open={open} closeHandler={closeModal} cargo={cargo} /> */}
      {/* <TablerHeader handleSorting={handleSorting} /> */}
      {showToolbox && <Toolbox deleteCargos={deleteCargos} />}
      {listItems.map((item, index) => (
        <ListItem key={index} product={item} openModal={openModal} selectedIDs={selectedIDs} select={addToSelectedArrayIds} />
      ))}
    </div>
  )
}

export default List