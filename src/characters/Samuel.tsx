import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import missionArray from "./data/samuelMission.json"
import completeSpellsObject from "./data/spells.json"

// Make Mana Unlimited
// int 1.5

type SpellListObject = {
  [key:string]: Spell,
}

type Skills = {
  [key: string]: number,
  intelligence:number,
  strength:number,
  speed:number,
  mana:number,
  "mana counter":number
}

type Spell = {
  effect: string,
  manaCost: string,
  debuff: string
}

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function (word: string) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

const bodyColor = "#4c0099"
const characterColor = "#b266ff"

const Samuel = () => {
  
  const tempCharacter : null | string = localStorage.getItem('pageCharacter')
  const character : string = tempCharacter !== null ? tempCharacter : "gabriel"
  const tempSkills : string | null = localStorage.getItem(`${character}Skills`)
  const tempMission: string | null = localStorage.getItem(`${character}Mission`)
  const tempSpellList: string | null = localStorage.getItem(`${character}SpellsList`)
  const tempCurrentSpell: string | null = localStorage.getItem(`${character}CurrentSpell`)
  const typedCompleteSpellsObject : SpellListObject = {...completeSpellsObject}
  const [spellList, setSpellList] = useState<Array<string>>(tempSpellList !== null ? JSON.parse(tempSpellList) : [])
  const [currentSpell, setCurrentSpell] = useState<string>(tempCurrentSpell !== null ? tempCurrentSpell : "")
  const [currentMisson, setMisson] = useState<number>(tempMission !== null ? JSON.parse(tempMission) : 0)
  const [skills, setSkills] = useState<Skills>(tempSkills !== null ? JSON.parse(tempSkills) : {
    intelligence:11,
    strength:8,
    speed:8,
    mana:"infinite",
    "mana counter":0,
  })

  useEffect(() => {
    document.title = `Player | ${toTitleCase(character)}`
  }, [character])

  const changeSpell = (event: SelectChangeEvent) => {
    setCurrentSpell(event.target.value);
    localStorage.setItem(`${character}CurrentSpell`, event.target.value)
  };

  const addSpell = () => {
    if (currentSpell == '') {
      return
    }
    if (spellList.includes(currentSpell)) {
      return
    }
    setSpellList((oldArray: Array<string>) => [...oldArray, currentSpell])
    localStorage.setItem(`${character}SpellsList`, JSON.stringify([...spellList, currentSpell]))
  }

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
          minWidth:"225px",
          maxWidth:"300px",
          maxHeight:"50%"
        }}>
          <Typography variant='h4'>Spells</Typography>
          <Box sx={{display:"flex"}}>
            <FormControl sx={{ m: 1, minWidth:150}}>
              <InputLabel id="demo-simple-select-helper-label">Spell</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={currentSpell}
                label="Current Spell"
                onChange={changeSpell}
                variant="standard"
              >
                <MenuItem value="">None</MenuItem>
                {
                  Object.keys(typedCompleteSpellsObject).map((key) => (
                    <MenuItem key={key} value={key}>{toTitleCase(key)}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText>Choose Spell For Description | Add</FormHelperText>
            </FormControl>
            <Button variant='contained' onClick={addSpell} size='small'>Add Spell</Button>
          </Box>
          {
            currentSpell !== "" ? <Box>
              <Typography>{typedCompleteSpellsObject[currentSpell].effect}</Typography>
              <br />
              <Typography>{typedCompleteSpellsObject[currentSpell].debuff}</Typography>
              <br />
              <Typography>Mana Cost: {typedCompleteSpellsObject[currentSpell].manaCost}</Typography>
            </Box> : ""
          }
          
          <List>
              <ListItem divider></ListItem>
          {
            spellList.map((spell : string) => (
              <ListItem key={spell} divider >
                <ListItemIcon>{">"}</ListItemIcon>
                <ListItemText primary={toTitleCase(spell)}/>
              </ListItem>
            ))
          }
          </List>
        </Box>
        <Box sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"250px",
          maxWidth:"300px",
        }}>
          <Typography variant='h4'>Special Ability</Typography>
          <Typography sx={{margin:"10px"}} variant='h5'>King</Typography>
          <Typography sx={{margin:"15px"}}>You have infinite mana </Typography>
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
          <Typography variant='h4'>Background</Typography>
          <Typography maxHeight={"400px"} sx={{
            overflowY:"scroll",
            margin:"10px"
          }}>
            In a magical realm, Samael, a child born with talents incomparable to anyone his age. Just like others, he received a special book at the age of 15, but something was different—his book is an elite version, marking him as one of the ten geniuses destined to become the King’s Knights. Despite his extraordinary abilities, Samael's parents never paid much attention to him. They believed he didn't need their care, unaware that, like any other child, Samael yearned for his parents' attention and love. Living a life of loneliness, with no one caring about him, the built-up anger fueled Samael's desires beyond the noble pursuit of knighthood. He craved the throne itself, hoping to prove to everyone that he was the strongest and deserving of the attention he sought.
            <br /><br /> Engaging in rigorous training day and night, Samael discovered the extraordinary power within him, enabling him to access people’s memories, essentially making him an almighty god. Throughout his adventures, he manipulated and altered memories across the Kingdom, storing them for later purposes. One day, Raphael was wandering around, searching for people who could be useful for his plan. Samael spotted a peculiar guy training without a magic book. Samael approached him, inquired about his name, and questioned why he trained without a magic book. They soon became friends, training together. After months of camaraderie, Samael disclosed his ambitious plan to Raphael – taking down the King and assuming the throne.
            <br /><br /> However, things took a turn when Raphael refused to join Samael in his quest to overthrow the King. Faced with this rejection, Samael had no choice but to access Raphael’s memories and alter them to portray a childhood friendship between them.
            <br /><br /> The time eventually arrived when Samael, accompanied by his closest henchman, Raphael, set out to assassinate the King. Utilizing his divine abilities, Samael erased the King’s memory of how to use magic, leaving only the task of allowing Raphael to defeat the King in his instinctual state. After the successful regicide, Samael was declared the new King of the Kingdom.
            <br /><br /> Day by day, he manipulated people’s memories, gaining their unwavering trust. However, he encountered an unexpected challenge in a child named Michael, whose memories proved resistant to his powers. Fearing the potential loss of his influence, Samael dispatched Raphael to eliminate Michael and his family.
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

export default Samuel