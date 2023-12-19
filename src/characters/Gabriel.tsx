import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import missionArray from "./data/gabrielMissions.json"
import completeSpellsObject from "./data/spells.json"

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
const characterColor = "#CC99FF"

const Gabriel = () => {
  
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
    intelligence:10,
    strength:8,
    speed:8,
    mana:30,
    "mana counter":5,
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
                      <Button sx={{marginLeft:"1%"}} size='small' onClick={() => {
                        const tempObject: Skills = {...skills}
                        tempObject[key]++
                        localStorage.setItem(`${character}Skills`, JSON.stringify(tempObject))
                        setSkills({...tempObject})
                      }}><AddRoundedIcon /></Button>
                      <Button size='small' onClick={() => {
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
          <Typography sx={{margin:"10px"}} variant='h5'>Gravity Manipulator</Typography>
          <Typography sx={{margin:"15px"}}>You can stun people inside the same space as you removing their next turn </Typography>
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
            Once upon a time in a magical world, there was this kid named Gabriel. He was destined to become one of the strongest magic users in the world. Just like all the other kids when they turned 15, Gabriel received a magic book, but something was different. He got an elite version of the magic book, making him one of the ten geniuses destined to become the King’s Knights.
            <br /><br /> As usual, Gabriel trained with his best friend Michael. Unfortunately, Michael wasn't bestowed with magical abilities, yet in compensation, he proved to be faster and stronger than anyone his age. He effortlessly leaped from tree to tree and building to building during their training sessions, causing Gabriel to reconsider whether Michael was truly weaker than him. Consequently, he often got picked on and beaten up by other kids. Gabriel would always step in to protect Michael. After a few months, all the anger built up, and Michael decided to leave the Kingdom, leaving Gabriel all alone.
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

export default Gabriel