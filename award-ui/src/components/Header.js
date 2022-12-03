import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FilterIcon from '@mui/icons-material/FilterList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { Stack } from '@mui/system';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: 'white',
    color: 'grey',
    boxShadow: 'none',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
}));

const MenuItem = styled('a')(() => ({
    textDecoration: 'none',
    color: 'gray'
}));

const ToolbarRightSection = styled('section')(() => ({
    marginLeft: "auto",
    marginRight: -12
}));

function valuetext(value) {
    return `${value} Poin`;
}

export default function Header(props) {
    const [open, setOpen] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filterPoin, setFilterPoin] = React.useState(10000);
    const [filterType, setFilterType] = React.useState({
        all: true,
        vouchers: true,
        products: true,
        others: true,
    });

    const handleChangeSliderPoin = (event, newValue) => {
        setFilterPoin(newValue);
    };

    const handleChangeFilterType = (event) => {
        setFilterType({
            ...filterType,
            [event.target.name]: event.target.checked,
        });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerOpenFilter = () => {
        setOpenFilter(true);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const toggleDrawerFilter = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenFilter(open);
    };

    const handleFilter = async () => {
        console.log("Filter", filterPoin, filterType);

        let queryPoin = `min=${10000}&max=${filterPoin}`;

        let queryType = "type=";
        if (!filterType["all"]) {
            let filterBy = [];
            if (filterType["vouchers"]) filterBy.push("vouchers");
            if (filterType["products"]) filterBy.push("products");
            if (filterType["others"]) filterBy.push("others");
            
            queryType = queryType + filterBy.join(",");
        }

        let targetUrl = `http://localhost:8000/api/award?src=awardapp&${queryPoin}&${queryType}`

        try {
            await axios.get(targetUrl)
                .then((response) => {
                    console.log("success", response.data);
                    let tempAwards = [];
                    response.data.data.map((award) => {
                        tempAwards.push(award);
                    });
                    props.onFilterData(tempAwards);
                    props.onFilterCount(response.data.data.last_page);
                });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {props.title}
                    </Typography>

                    <ToolbarRightSection className={""}>
                        <IconButton color="inherit" aria-label="Filter" onClick={handleDrawerOpenFilter}>
                            <FilterIcon />
                        </IconButton>
                    </ToolbarRightSection>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor={"left"}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h6" align={"center"}>Awards Menu</Typography>

                <List>
                    {[
                        { text: 'Home', link: "/home" },
                        { text: 'Cards', link: "/home" },
                        { text: 'Profile', link: "/home" },
                        { text: 'Logout', link: "/email" }
                    ].map((item, index) => {
                        const { text, link } = item
                        return (
                            <>
                                <ListItem key={text} disablePadding>
                                    <MenuItem href={link} component={ListItemButton}>
                                        <ListItemButton>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </MenuItem>
                                </ListItem>
                            </>
                        );

                    })}
                </List>
                
            </Drawer>


            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor={"right"}
                open={openFilter}
                onClose={toggleDrawerFilter(false)}
            >
                <Typography variant="h6" align={"center"}>Filter</Typography>
                
                <Stack sx={{
                    padding: "8px 16px",
                 }}>
                    <Typography id="filterPoin" gutterBottom>
                        Poin Needed: { filterPoin.toLocaleString("en-US") }
                    </Typography>
                    <Slider
                        aria-label="Poin Needed"
                        defaultValue={50}
                        min={10000} max={1000000}
                        valueLabelDisplay="on"
                        sx={{ marginTop:"30px" }}
                        getAriaValueText={valuetext}
                        onChange={handleChangeSliderPoin}
                        step={10000}
                    />
                    <Divider />
                    <Typography id="filterPoin" gutterBottom sx={{ margin:"30px" }}>
                        Award Type
                    </Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeFilterType} name="all" />} label="All" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeFilterType} name="vouchers" />} label="Vouchers" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeFilterType} name="products" />} label="Products" />
                        <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeFilterType} name="others" />} label="Others" />
                    </FormGroup>
                    <Button variant="contained" color={"info"} sx={{
                        margin: "30px auto",
                    }} onClick={handleFilter}>
                        Filter
                    </Button>
                </Stack>
                
            </Drawer>
            
            <Main open={open}>
                <DrawerHeader />

                { props.children }
            </Main>
        </Box>
    );
}