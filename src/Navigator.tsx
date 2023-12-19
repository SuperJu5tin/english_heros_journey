import { Box, Button, ButtonGroup, Container } from '@mui/material'
import { useState } from 'react'
import MainPage from './MainPage'
import Samuel from './characters/Samuel'
import Michael2 from './characters/Michael'
import Gabriel from './characters/Gabriel'
import Raphael from './characters/Raphael'

function Navigator() {

  const [page, setPage] = useState(localStorage.getItem("pageCharacter") == null ? "introduction" : localStorage.getItem("pageCharacter"))

  const clearStorage = () => {
    localStorage.clear()
    page == null ? localStorage.setItem('pageCharacter', 'introduction') : localStorage.setItem('pageCharacter', page)
    window.location.reload()
  }

  const selectIntroduction = () => {
    setPage("introduction")
    localStorage.setItem('pageCharacter', 'introduction')
  }
  const selectMichael = () => {
    setPage("michael")
    localStorage.setItem('pageCharacter', 'michael')
  }
  const selectGabriel = () => {
    setPage("gabriel")
    localStorage.setItem('pageCharacter', 'gabriel')
  }
  const selectRaphael = () => {
    setPage("raphael")
    localStorage.setItem('pageCharacter', 'raphael')
  }
  const selectSamuel = () => {
    setPage("samuel")
    localStorage.setItem('pageCharacter', 'samuel')
  }


  return (
  <>
    <Container style={{
      paddingTop:"30px",
    }}>
      <ButtonGroup variant='contained'  sx={{background:"rgb(71, 52, 200)",}} >
        <Button sx={{background:"#4500e2",}} disabled={page === "introduction"} onClick={selectIntroduction}>Introduction</Button>
        <Button sx={{background:"#4500e2",}} disabled={page === "michael"} onClick={selectMichael}>Michael</Button>
        <Button sx={{background:"#4500e2",}} disabled={page === "gabriel"} onClick={selectGabriel}>Gabriel</Button>
        <Button sx={{background:"#4500e2",}} disabled={page === "raphael"} onClick={selectRaphael}>Raphael</Button>
        <Button sx={{background:"#4500e2",}} disabled={page === "samuel"} onClick={selectSamuel}>Samuel</Button>
      </ButtonGroup>
      <Button onClick={clearStorage} variant="contained" sx={{background:"#d8b2ff", color:"black"}} >Reset</Button>
    </Container>
    {page === "introduction" ? <MainPage /> : <Box></Box>}
    {page === "samuel" ? <Samuel /> : <Box></Box>}
    {page === "michael" ? <Michael2 /> : <Box></Box>}
    {page === "gabriel" ? <Gabriel /> : <Box></Box>}
    {page === "raphael" ? <Raphael /> : <Box></Box>}
  </>
    
  )
}

export default Navigator