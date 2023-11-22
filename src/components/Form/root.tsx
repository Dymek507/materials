import { Box, Button, Container, Grid, Typography } from "@mui/material"
import CustomTextField from "./CustomTextField"

import MultiSelect from "../MultiSelect"
import { useRef } from "react"
import { TextFieldType } from "./types/formTypes"

type FormProps = {
  inputData: TextFieldType[],
  defaultCategory?: string[],
  getData?: (categories: string[], event: any) => void
}

const Form = ({ inputData, defaultCategory = [], getData = () => { console.log('brak danych') } }: FormProps) => {
  const category = useRef(defaultCategory)
  console.log(category.current)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getData(category.current, event)
  }

  const selectCategories = (e: any) => {
    category.current = e
  }

  return (
    <Container component="main" maxWidth="xl" sx={{
      backgroundColor: "white",
      height: "600px",
    }}>
      <Box
        sx={{
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Dodaj produkt
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
          }}
        >
          <Grid container className="w-full bg-slate-200" justifyContent="center" gap={2}>
            <Grid item xs={5}>
              <MultiSelect selectCategories={selectCategories} defaultCategories={defaultCategory} />
            </Grid>
            {inputData.map((item, index) => {
              return (
                <Grid item xs={5} key={index}>
                  <CustomTextField id={item.id} type={item.type} label={item.label} defaultValue={item.defaultValue} disabled={item.disabled} />
                </Grid>
              )
            })}
            <Button type="submit" fullWidth variant="contained" >Wyślij</Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Form
