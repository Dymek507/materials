import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type ActionCardProps = {
  title: string;
  image: string;
};

export default function ActionCard({ title, image }: ActionCardProps) {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: 'transparent' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt=""
        />
        <CardContent sx={{ backgroundColor: 'transparent' }}>
          <Typography gutterBottom variant="h5" component="div" color="white" textAlign='center' >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}