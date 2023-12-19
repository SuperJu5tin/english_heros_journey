import { useEffect, useState } from 'react'
import { Box, Button, List, ListItem, ListItemIcon, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import missionArray from "./data/michaelMission.json"

type Skills = {
  [key: string]: number,
  intelligence:number,
  strength:number,
  speed:number,
  mana:number,
  "mana counter":number
}

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function (word: string) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

const bodyColor = "#4c0099"
const characterColor = "#D9B3FF"

const Michael = () => {
  
  const tempCharacter : null | string = localStorage.getItem('pageCharacter')
  const character : string = tempCharacter !== null ? tempCharacter : "gabriel"
  const tempSkills : string | null = localStorage.getItem(`${character}Skills`)
  const tempMission: string | null = localStorage.getItem(`${character}Mission`)
  const [currentMisson, setMisson] = useState<number>(tempMission !== null ? JSON.parse(tempMission) : 0)
  const [skills, setSkills] = useState<Skills>(tempSkills !== null ? JSON.parse(tempSkills) : {
    intelligence:9,
    strength:12,
    speed:12,
    mana:0,
    "mana counter":0
  })

  useEffect(() => {
    document.title = `Player | ${toTitleCase(character)}`
  }, [character])

  const incrementMission = () => {
    setMisson((old:number) => old + 1)
    localStorage.setItem(`${character}Mission`, `${currentMisson + 1}`)
  }


  return (
    <>
      <Box sx={{
        height:"100px",
        background:`linear-gradient(${bodyColor}, ${characterColor})`
      }}></Box>
      <Box sx={{
        display:"flex",
        flexDirection:"row",
        alignContent:"center",
        flexWrap:"wrap",
        background:characterColor
      }}>
        <Box sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"250px",
          maxWidth:"300px",
        }}>
          <Box>
            <Typography variant='h4' >Skills</Typography>
            <List>
                <ListItem divider></ListItem>
              {
                Object.keys(skills).map((key) => (
                  <ListItem key={key} divider >
                    <ListItemIcon>{toTitleCase(key) + ":"}</ListItemIcon>
                    <Box sx={{
                      display:"flex",
                      marginLeft:"auto",
                      marginRight:0
                    }}>
                      <Typography></Typography>
                    </Box>
                    <Box sx={{
                      display:"flex",
                      marginLeft:"auto",
                      marginRight:0
                    }}>
                      <Typography sx={{marginLeft:"1%", marginTop:"5px"}}>{skills[key]}</Typography>
                      <Button sx={{marginLeft:"1%"}} size='small' disabled={key == 'mana' || key === 'mana counter'} onClick={() => {
                        const tempObject: Skills = {...skills}
                        tempObject[key]++
                        localStorage.setItem(`${character}Skills`, JSON.stringify(tempObject))
                        setSkills({...tempObject})
                      }}><AddRoundedIcon /></Button>
                      <Button size='small' disabled={key == 'mana' || key === 'mana counter'} onClick={() => {
                        const tempObject: Skills = {...skills}
                        tempObject[key]--
                        localStorage.setItem(`${character}Skills`, JSON.stringify(tempObject))
                        setSkills({...tempObject})
                      }}><RemoveRoundedIcon /></Button>
                    </Box>
                  </ListItem>
                ))
              }
            </List>
          </Box>
        </Box>
        <Box sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"250px",
          maxWidth:"300px",
        }}>
          <Typography variant='h4'>Special Ability</Typography>
          <Typography sx={{margin:"10px"}} variant='h5'>Inhuman Physically</Typography>
          <Typography sx={{margin:"15px"}}>You get *3 to every physical trait gain </Typography>
        </Box>
        <Box sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"100px",
          maxWidth:"225px",
        }}>
          <Typography variant='h4'>Missions</Typography>
          {currentMisson == missionArray.length ? <Typography variant='h1'>You Won!</Typography> : <Typography>{missionArray[currentMisson]}</Typography>}
          <Button disabled={currentMisson == missionArray.length} onClick={incrementMission}>Finished Mission</Button>
        </Box>
        <Box sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"100px",
          maxWidth:"600px",
        }}>
          <Typography variant='h4'>Backgorund</Typography>
          <Typography maxHeight={"400px"} sx={{
            overflowY:"scroll",
            margin:"10px"
          }}>
            Once upon a time in a magical world, there was this kid named Michael, just 7 or 8 years old. One night, after hanging out with his buddy Gabriel at the park, he went home and found his parents got attacked by a masked guy. They were worn out but managed to tell Michael to run; the masked guy said that he was useless and would eventually die without them.
            <br /><br /> Life without magic in a world where everyone had it was a daily struggle for Michael. Dealing with bullies was the norm, but he found comfort with Gabriel's family, who took care of him until he hit 15. Things took a turn when kids his age got magic books to boost their skills. Michael got left out, facing more humiliation and violence from the others.
            <br /><br /> After countless times of getting beat up by the other kids, Michael decided to leave everything behind. He headed to the woods, trained hard for two years, and came back as a total powerhouse, catching everyone off guard.
            <br /><br /> With a strong urge to figure out why his parents got killed, Michael set off on a risky journey. He learned that his folks were targeted for not having magic by a mysterious masked guy who worked for Samael, the King of the Magic Kingdom.
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        height:"100px",
        background:`linear-gradient(${characterColor}, ${bodyColor})`
      }}></Box>
    </>
  )
}

export default Michael