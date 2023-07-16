import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};
const divStyle2 = {
  marginRight: '10px'
};
const divStyle3 = {
  marginRight: '5px'
};
const cardStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardItem({item}) {
  return item ? (
    <Card style={cardStyle}>
      {item.images && item.images.fixed_height && item.images.fixed_height.url && <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.images.fixed_height.url}
      />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <div style={ divStyle }>  
           <div style={ divStyle2 }>Uploaded By:</div> 
           <div style={ divStyle3 }> <Avatar alt={item.user && item.user.username} src={item.user && item.user.avatar_url} sx={{ width: 24, height: 24 }} /> </div> 
           <div>({item.user && item.user.username})</div> 
          </div>
        
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={item.user && item.user.profile_url} target="_blank" rel="noreferrer">Visit User Profile</a></Button>
      </CardActions>
    </Card>) :  (<Card style={cardStyle}>Empty Card</Card>);
}