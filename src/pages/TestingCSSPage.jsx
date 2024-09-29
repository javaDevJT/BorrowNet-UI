import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react'

const reviewsList = ["John", "Emily", "Mike", "Henry"];
const reviewContent = `Niente è paragonabile. Esiste forse cosa
    che non sia tutta sola con sé stessa e indicibile?
    Invano diamo nomi, solo è dato accettare
    e accordarci che forse qua un lampo, là uno sguardo
    ci abbia sfiorato, come
    se proprio in questo consistesse vivere
    la nostra vita.`

const TestingCSSPage = () => {
  return (
    <Container>
        <Typography
         variant="h2"
         sx={{my: 4, textAlign: "center", color: "primary.main"}}
        >
            Reviews
        </Typography>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            flexDirection: "column",

          }}
        >
            {reviewsList.map((review) => (
                <Paper elevation={5}>
                    <Box sx={{m:3}}>
                        <Typography variant='h4'>{review}</Typography>
                        <Typography sx={{mt:2}}>{reviewContent}</Typography>
                        <Button sx={{m:1}}>Hello</Button>
                    </Box>
                </Paper>
            ))}
        </Box>

    </Container>

  )
}

export default TestingCSSPage