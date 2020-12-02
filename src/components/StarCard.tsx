import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json().then(data => data as T);
    })
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: '10px'
    },
    media: {
      height: 0,
      paddingTop: '100%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[200],
    },
  }),
);

export default function StarCard() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [preview, setPreview] = useState('');
  const [detail, setDetail] = useState('');

  interface star {
    image: string;
    name: string;
    detail: string;
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await Promise.resolve({
        name: '水卜さくら',
        image: 'https://imgur.com/KM360aL.jpg',
        detail: '很可愛'
      })
      // api<star>('http://localhost:8000/star')
      setName(response.name)
      setPreview(response.image)
      setDetail(response.detail)
    }
    fetchMyAPI()
  }, []);

  return (
    <Card className={classes.root} style={{ width: '100vw' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name.slice(0, 1)}
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={preview}
        title="Paella dish"
      />
      <CardContent>
        <Button variant="outlined">點我搜尋去</Button>
      </CardContent>
    </Card>
  );
}