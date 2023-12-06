import React from "react";
import { v1 as uuidv1 } from "uuid";

import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";

import { ICompany } from "../../types/model";
import getCords from "../../utils/getCords";
import updateCompany from "./helpers/updateCompany";
import addCompany from "../../utils/addCompany";
import { getDate } from "../../utils/getDate";
import MultiSelect from "../../components/MultiSelect";

interface IProps {
  handleClose: () => void;
  companyData?: ICompany;
  getRefresh: () => void;
  edit: boolean;
}

export default function CompanyForm({ handleClose, companyData, getRefresh, edit }: IProps) {
  const { id, group, company, nip, category, adress, comment, mail, person, phone, siding, cords } = companyData ?? {} as ICompany;

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(category ?? []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") || data.get("category")?.length === 0) return;

    const company: ICompany = {
      id: id ?? uuidv1(),
      group: data.get("group") as string,
      company: data.get("company") as string,
      nip: data.get("nip") as string,
      category: selectedCategories,
      adress: data.get("adress") as string,
      comment: data.get("comment") as string,
      mail: data.get("mail") as string,
      person: data.get("person") as string,
      phone: [data.get("phone")] as string[],
      siding: data.get("siding") as string,
      cords: data.get("adress") !== "" ? await getCords(data.get("adress") as string) : cords,
      date: getDate(),
      update: getDate(),
    };

    if (edit) {
      updateCompany(company);
    } else {
      addCompany(company);
    }
    getRefresh();
    handleClose();
  };

  const selectCategories = (e: string[]) => {
    setSelectedCategories(e);
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
        <Box className="flex flex-row justify-between w-full">
          <Typography component="h1" variant="h5" color="gray" className="ml-8">
            Dodaj firmę
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
          }}
        >
          <Grid container className="w-full" justifyContent="center" gap={2}>
            <Grid item xxs={5}>
              <TextField
                margin="normal"
                fullWidth
                id="group"
                type="text"
                label="Grupa"
                name="group"
                defaultValue={group}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                type="text"
                label="Firma"
                name="company"
                defaultValue={company}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="nip"
                type="text"
                label="NIP"
                name="nip"
                defaultValue={nip}
                autoFocus
              />
              <Box sx={{ mt: '1rem' }}>
                <MultiSelect defaultCategories={category} selectCategories={selectCategories} />
              </Box>
            </Grid>
            <Grid item xxs={5}>
              <TextField
                margin="normal"
                fullWidth
                id="adress"
                type="text"
                label="Adress"
                name="adress"
                defaultValue={adress}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                required
                id="mail"
                type="text"
                label="Email"
                name="mail"
                defaultValue={mail}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="person"
                type="text"
                label="Osoba kontaktowa"
                name="person"
                defaultValue={person}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="phone"
                type="text"
                label="Telefon"
                name="phone"
                defaultValue={phone}
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="siding"
                type="text"
                label="Bocznica"
                name="siding"
                defaultValue={siding}
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid item xxs={12} className="pl-14 pr-14">
            <TextField
              margin="normal"
              fullWidth
              id="comment"
              type="text"
              label="Komentarz"
              name="comment"
              defaultValue={comment}
              autoFocus
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            DODAJ
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
