import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import sampleImage from './grey.png';
import Pagination from '@mui/material/Pagination';
import { Divider } from '@mui/material';

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    let [awards, setAwards] = useState([]);
    let [count, setCount] = useState(0);

    const fetchData = async () => {
        setIsLoading(false);
        try {
            await axios.get(`http://localhost:8000/api/award`)
                .then((response) => {
                    console.log("success", response.data);
                    let tempAwards = [];
                    response.data.data.map((award)=>{
                        tempAwards.push(award); 
                    });
                    setAwards(tempAwards);
                    setCount(response.data.data.last_page);
                    setIsLoading(true);
                });
        } catch (err) {
            console.log(err);
            setIsLoading(true);
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    const onFilterData = (data)=>{
        setAwards(data);
    }
    const onFilterCount = (data) => {
        setCount(data);
    }


    return (
        <>
            <Header title={""} onFilterData={onFilterData} onFilterCount={onFilterCount}>
                <Stack spacing={2}>
                    { isLoading && awards.map(award => {
                        return (
                            <Card sx={{ maxWidth: 345, boxShadow:'none' }} key={award.id}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={award.image || sampleImage}
                                    alt={award.name}
                                />
                                <Typography gutterBottom variant="h6" component="div">
                                    {award.name}
                                </Typography>

                                <Chip label={award.award_type} color="success" />
                                &nbsp;
                                <Chip label={award.poin.toLocaleString("en-US") + " Poin"} /> 
                            </Card>
                        )
                    })}

                </Stack>
                <Divider sx={{ margin:"30px auto" }}></Divider>
                <Pagination count={count} />
            </Header>
        </>
    );
}

export default Home;