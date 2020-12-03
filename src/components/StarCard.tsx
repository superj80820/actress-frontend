import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import getInfoByID from '../repository/face-service';

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

const clickToSearchByStarName = (name: string) => () => window.open(`https://google.com/search?q=${name}`)

export default function StarCard(prop: { ID: string }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    async function fetchAPI() {
      const info = await getInfoByID(prop.ID)
      setName(info.name)
      setPreview(info.image)
    }
    fetchAPI()
  }, [prop]);

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
      {preview ? (<>
        <CardMedia
          className={classes.media}
          image={preview} />
        <CardContent>
          <Button onClick={clickToSearchByStarName(name)} variant="outlined">點我搜尋去</Button>
        </CardContent>
      </>) : (<div/>)}
    </Card>
  );
}