import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import missionArray from "./data/raphaelMissionObjective.json"
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
const characterColor = "#BF80FF"

const Raphael = () => {
  
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
    mana:35,
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
          <Typography sx={{margin:"10px"}} variant='h5'>Learns quickly but at the cost of others</Typography>
          <Typography sx={{margin:"15px"}}>Can steal 2 of any skill from any player within 1 square of you. *2 to mana gains, *2 to intelligence gains. </Typography>
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
            In a magical realm, Raphael, an orphan, was left at the front of the church by his parents when he was only 2 months old, as he was an unintended consequence of their union. Unlike others, Raphael's talent was unparalleled; he possessed the extraordinary ability to remember and understand everything from the moment he entered the world. When he turned 15, he didn't just receive any ordinary book. Unlike the normal or even the geniuses, his book was one of a kind—a book without a cover and invisible to everyone except himself, making his potential limitless. Despite being bullied by everyone for not having a magic book, Raphael knew he could defeat them at will but chose not to.
            <br /><br />Raphael faced abandonment once again, this time by the people he loved. At the age of 17, while he was training, a guy deemed one of the ten geniuses approached him and introduced himself as Samael. Impressed by each other's power, they spent countless times training and hanging out together. Samael asked Raphael to join him in assassinating the current King of the Kingdom, but Raphael declined, unwilling to harm anyone. However, Samael did not accept that as a no; he accessed Raphael’s memories and changed them to reflect a childhood friendship.
            <br /><br />Raphael later recovered his memories by copying Samael’s ability, restoring his true past. Despite this, he chose not to betray Samael due to the bond they had formed over the past year. He followed Samael and assassinated those who opposed him. The moment arrived when Raphael was ordered to eliminate a family. He grappled with the morality of murdering innocent people, finding hope when he realized that the family possessed the power to defeat Samael and restore him to the kind person Raphael once knew.
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

export default Raphael