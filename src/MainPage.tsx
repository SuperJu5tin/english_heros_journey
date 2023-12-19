import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useEffect } from 'react'

const bodyColor = "#4c0099"
const characterColor = "#E5CCFF"

const boxStyles = {
  minWidth: "300px", 
  maxWidth: "500px", 
  display:"inline", 
  marginLeft:"auto", 
  marginRight:"auto",
  marginBottom:"20px"
}

function MainPage() {

  useEffect(() => {
    document.title = `Introduction`
  }, [])

  return (
    <>
      <Box sx={{
        height:"100px",
        background:`linear-gradient(${bodyColor}, ${characterColor})`
      }}></Box>
      <Box sx={{
        paddingTop:"30px",
        paddingBottom:"10px",
        backgroundColor:characterColor
      }}>

        <Box sx={{
          paddingLeft:"10%",
          paddingRight:"10%",
          display:"flex",
          flexDirection: "row",
          alignContent: "center",
          flexWrap: "wrap",
        }}>
          <Box sx={boxStyles}>
            <Typography variant='h4'>Beginning The Game (Setup): </Typography>
            <Typography variant='body1'>
              Get the board out, set the player cards in a line, put the tracker at designated starting stats for each card, and get the first objective/mission card for the character chosen. All Players roll dice to see who picks the player card. The highest number goes first.
            </Typography>
          </Box>
          <Box sx={boxStyles}>
            <Typography variant='h4'>Winning/Losing The Game</Typography>
            <Typography>
              If you drop to intelligence 0, your character is brain-dead and you have lost the game. When someone finishes an objective card, they have won the game.
            </Typography>
          </Box>
          <Box sx={boxStyles}>
            <Typography variant='h4'>Taking a Turn</Typography>
            <Typography>
              You may move, with the option of one space per 5-speed. Then you may interact with another player in the same square as you. After each step is completed you may get the skill bonuses associated with the area you are in
            </Typography>
          </Box>
          <Box sx={boxStyles}>
            <Typography variant='h4'>Interactions include:</Typography>
            <List>
              <ListItem>
                <ListItemText primary={"Cast Spell - Follow the steps on the spell card."} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Pawnch - You throw a punch at another player where if your speed is higher than their speed they they lose intelligence equal to the difference between your strength - (their speed + dice) and you move to a fight phase. If it is not, you miss, then move to their turn in the fight phase"} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Teach - If you have a higher intelligence than the other player you may teach them. They get to roll a dice and they gain that much intelligence up your current intelligence. You then gain 1 intelligence."} />
              </ListItem>
            </List>
          </Box>
          <Box sx={boxStyles}>
            <Typography variant='h4'>Attack Phase</Typography>
            <List>
              <ListItem>
                <ListItemText primary={"Entering the fight phase stops your ability to interact for the rest of the turn. The attack phase is started by using an action on someone else. After the first attack is thrown the player attacked gets a choice to throw back another attack or retreat, attacks consist of spells and punching. This cycle continues until one player retreats."} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"If a punch is thrown back, the player adds their intelligence, strength, and a rolled dice. The amount higher the total is than the other player's speed and intelligence total is taken from the other player's intelligence. "} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"If a spell is cast you follow the instructions on the spell card."} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"If a player retreats, the attack phase is ended and the original player's turn continues."} />
              </ListItem>
            </List>
            <Typography></Typography>
          </Box>
          <Box sx={boxStyles}>
            <Box sx={{...boxStyles}}>
            <Typography variant='h4'>Areas On The Board</Typography>
              <List>
                <ListItem>
                  <Typography variant='h5'>Courtyard: </Typography>
                  <Typography sx={{margin:"10px"}}>This area gives you +1 in mana, speed, and strength where applicable</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5'>Gym: </Typography>
                  <Typography sx={{margin:"10px"}}>This area gives you +2 in each physical skill (strength, speed).</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5'>Library: </Typography>
                  <Typography sx={{margin:"10px"}}>This area gives you +1 in intelligence.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5'>Spell Library: </Typography>
                  <Typography sx={{margin:"10px"}}>This area gives you Mana equal to your Mana Counter skill. Afterwards add +5 to Mana Counter Skill. You also get to learn 2 new spells</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5'>Meditation Center: </Typography>
                  <Typography sx={{margin:"10px"}}>This area will regenerate your stats +2 in every category up to to your initial - 2.</Typography>
                </ListItem>
                
              </List>
              
            </Box>
          </Box>
          


          <Box sx={boxStyles}>
            <Typography variant='h4'></Typography>
            <Typography></Typography>
          </Box>
        
        </Box>
      </Box>
      <Box sx={{
        height:"100px",
        background:`linear-gradient(${characterColor}, ${bodyColor})`
      }}></Box>
    </>
    
  )
}

export default MainPage