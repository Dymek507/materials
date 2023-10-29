import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useAppDispatch } from '../../../store/app/hooks';
import { IConstructionSite } from '../../../types/model';
import { v1 as uuidv1 } from "uuid";
import getCords from '../../../utils/getCords';
import addSite from '../../../utils/addSite';
import { addConstructionSite } from '../../../store/constructionSlice';

interface IAddSiteProps {
  onClose: () => void
}

const AddSite = ({ onClose }: IAddSiteProps) => {

  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('name') && data.get('adress') === "") return

    const site: IConstructionSite = {
      id: uuidv1(),
      name: data.get('name') as string,
      adress: data.get('adress') as string,
      cords: await getCords(data.get('adress') as string),
      dist_arr: [],
      date: new Date().toLocaleDateString(),
    }
    addSite(site)
    dispatch(addConstructionSite(site))
    onClose()
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      backgroundColor: "white",
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
          Dodaj budowę
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            type="text"
            label="Nazwa budowy"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="adress"
            type="text"
            label="Adres"
            name="adress"
            autoFocus
          />
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

export default AddSite