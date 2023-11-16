import React from 'react'
import {Card, Typography, Container, Box} from '@mui/material'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'

const CargoPaper = () => {
  return (
    <>
        <Card className='py-4'>
            <Container>
                <Box component="div">
                    <img src={toAbsoulteUrl('/media/logos/follad.png')} width={60} height={60} className='mx-auto' />
                    <Typography variant='h2' className='text-center'>بازرگانی سپهر ایرانیان</Typography>    
                </Box>

            </Container>
        </Card>
    </>
  )
}

export default CargoPaper