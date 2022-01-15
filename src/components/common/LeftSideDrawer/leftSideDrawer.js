import React, { useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { get, set, del } from '../../utils/storage'
import ImageLoader from '../ImageLoader/imageLoader'
import clsx from 'clsx'
import { appStore, onAppMount } from '../../state/app'
import defaultProfileImage from '../../../img/default-profile.png'
// import AddPersonaForm from '../AddPersona/addPersona'
// import AddDaoForm from '../CreateDAO/addDao'
// import AddFTForm from '../CreateFT/createFT'
// import { DASHBOARD_DEPARTURE, NEW_NOTIFICATIONS} from '../../state/near'
// import NotificationCard from '../Notifications/notifications'
import {ceramic} from '../../../utils/ceramic'

// Material UI
import { makeStyles } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Avatar from '@mui/material/Avatar'
import GroupIcon from '@mui/icons-material/Group'
import ExploreIcon from '@mui/icons-material/Explore'
import useMediaQuery from '@mui/material/useMediaQuery'
import InfoIcon from '@mui/icons-material/Info'
import CodeIcon from '@mui/icons-material/Code'
import SchoolIcon from '@mui/icons-material/School'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import PieChartIcon from '@mui/icons-material/PieChart'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        padding: '10px',
      },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginTop: '5px',
        float: 'left',
        
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        float: 'right',
      },
  }));

export default function LeftSideDrawer(props) {

const classes = useStyles()
const matches = useMediaQuery('(max-width:500px)')
const [options, setOptions] = useState({
  doneLabel: 'Continue!',
  showButtons: true,
  overlayOpacity: 0.5,
  scrollTo: 'element',
  skipLabel: "Skip",
  showProgress: true
})
const [anchorEl, setAnchorEl] = useState(null);
const [addPersonaClicked, setAddPersonaClicked] = useState(false)
const [addDaoClicked, setAddDaoClicked] = useState(false)
const [addFTClicked, setAddFTClicked] = useState(false)
const [notificationsClicked, setNotificationsClicked] = useState(false)
const [stepsEnabled, setStepsEnabled] = useState(false)
const [newNotifications, setNewNotifications] = useState(0)

const { state, update } = useContext(appStore);

const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

const {
  wallet,
  appIdx,
  accountId,
  isUpdated
} = state

// useEffect(
//   () => {

    // async function fetchData(){
    //   if(isUpdated){}
    //   if(accountId){
    //     //get the list of all notifications for all accounts
    //     let result = await ceramic.downloadKeysSecret(appIdx, 'notifications')
    //     if(result){

    //         //convert the object from ceramic to map in order to more easily
    //         //return notifications associated with current account
    //         if(result[0]){
    //           let notificationMap = new Map(Object.entries(result[0])) 

    //           let notifications = 0;

    //           //loop thorugh all notifications for user, if the read flag is false, increase the count
    //           //for the notification badge
    //           if(notificationMap.get(accountId)){
    //             for(let i = 0; i < notificationMap.get(accountId).length; i++){
    //                 if(notificationMap.get(accountId)[i].read == false){
    //                     notifications++;
    //                 }
    //             }
    //           }
            

    //         //set the counter for the badge to the amount of unread notifications
    //         setNewNotifications(notifications)
    //         }
    //     }
    //   }
    // }

//     let intervalController = setInterval(checkDash, 500)
//     function checkDash(){
//       let newVisit = get(DASHBOARD_DEPARTURE, [])
//       if(newVisit[0]){
         
//           if(newVisit[0].status=="true" && !newVisit[1]){
//           setStepsEnabled(true)
//           setDrawerState({ ...drawerState, ['left']: true})
//           newVisit.push({arrived: 'true'})
//           set(DASHBOARD_DEPARTURE, newVisit)
//         }
//         clearInterval(intervalController)
//       }
//     }

//     fetchData()
//     .then((res) => {
  
//     })
//   }, [isUpdated, accountId]
// )

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
}

function handleAddPersonaClick(property){
    setAddPersonaClicked(property)
}

const addPersonaClick = (event) => {
    setAddPersonaClicked(true)
    handleClick(event)
}

function handleAddDaoClick(property){
    setAddDaoClicked(property)
}

function handleAddFTClick(property){
    setAddFTClicked(property)
}

function handleNotificationClick(property){
  setNotificationsClicked(property)
}

const addDaoClick = (event) => {
    setAddDaoClicked(true)
    handleClick(event)
}

const addFTClick = (event) => {
    setAddFTClicked(true)
    handleClick(event)
}

// const notificationsClick = (event) => {
//     setNotificationsClicked(true)
//     handleClick(event)
// }

const toggleDrawer = (anchor, open) => (event) => {
if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return
}

setDrawerState({ ...drawerState, [anchor]: open });
}

const list = (anchor) => (
<div
    className={clsx(classes.list, {
    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
>
{!matches ? (
  <>
    <div className='toolbar'>
    <List>
      <Link to='/'>
        <ListItem button key={1}>
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary='Dashboard'/>
        </ListItem>
      </Link>
      <ListItem button key={7}>
       
        <ListItemIcon>
          <Badge badgeContent={newNotifications} color='primary'>   
          <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        
        <ListItemText onClick={(e) => notificationsClick(e)} primary='Notifications'/>
      </ListItem>
    </List>
    <Divider />
    <Typography variant='h6'>Account</Typography>
    <List>
      <ListItem className='editProfile' button key={3} onClick={(e) => addPersonaClick(e)}>
        <ListItemIcon><AddBoxIcon /></ListItemIcon>
        <ListItemText primary='Edit Profile'/>
      </ListItem>
     
      <Link to='/newkey'>
        <ListItem className='recoverKey' button key={4}>
        <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
        <ListItemText primary='Recover Persona'/>
      </ListItem>
    </Link>
    </List>
    <Divider />
    <Typography variant='h6'>Spaces</Typography>
    <List>      
    <Link to='/add-space'>
        <ListItem className='manageSpaces' button key={3} onClick={(e) => addPersonaClick(e)}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary='Manage Spaces'/>
        </ListItem>
    </Link>
    </List>
    <Divider />
    <Typography variant='h6'>Trove</Typography>
    <List>
      <Link to='/fts'>
        <ListItem className='exploreTokens' button key={8}>
          <ListItemIcon><ExploreIcon /></ListItemIcon>
          <ListItemText primary='Explore Tokens'/>
        </ListItem>
      </Link>
      <ListItem className='createFT' button key={9} onClick={(e) => addFTClick(e)}>
        <ListItemIcon><AddBoxIcon /></ListItemIcon>
        <ListItemText primary='Create Token'/>
      </ListItem>
    </List>
    <Divider />
    </div>
  </>
  ) :
    wallet.signedIn ? (
      <>
      <List>
      <Link to='/'>
        <ListItem button key={1}>
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary='Dashboard'/>
        </ListItem>
      </Link>
    </List>
    <Divider />
    <Typography variant='h6'>Personas</Typography>
    <List>
      <Link to='/personas'>
        <ListItem button key={2}>
          <ListItemIcon><Avatar src={<ImageLoader image={defaultProfileImage}/>} className={classes.small}/></ListItemIcon>
          <ListItemText primary='My Personas'/>
        </ListItem>
      </Link>
      <ListItem button key={3} onClick={(e) => addPersonaClick(e)}>
        <ListItemIcon><AddBoxIcon /></ListItemIcon>
        <ListItemText primary='Create Persona'/>
      </ListItem>
    </List>
    <Divider />
    <Typography variant='h6'>Communities</Typography>
    <List>      
    <Link to='/explore'>
      <ListItem button key={5}>
        <ListItemIcon><ExploreIcon /></ListItemIcon>
        <ListItemText primary='Explore Communities'/>
      </ListItem>
    </Link>
    <ListItem button key={6} onClick={(e) => addDaoClick(e)}>
        <ListItemIcon><AddBoxIcon /></ListItemIcon>
        <ListItemText primary='Create Community'/>
      </ListItem>
    </List>
    <Divider />
    <Typography variant='h6'>Fungible Tokens</Typography>
    <List>
      <Link to='/fts'>
        <ListItem className='exploreTokens' button key={7}>
          <ListItemIcon><ExploreIcon /></ListItemIcon>
          <ListItemText primary='Explore Tokens'/>
        </ListItem>
      </Link>
      <ListItem className='createFT' button key={8} onClick={(e) => addFTClick(e)}>
        <ListItemIcon><AddBoxIcon /></ListItemIcon>
        <ListItemText primary='Create Token'/>
      </ListItem>
    </List>
    <Divider />
    </>
    ) : null }
    
    <Typography variant='h6'>Catalyst Support</Typography>
    <List>
    <a href='https://vitalpoint.ai/catalyst'>
      <ListItem button key={7}>
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText primary='About Catalyst'/>
      </ListItem>
    </a>
    <a href='https://vitalpoint.ai/catalyst-for-developers'>
      <ListItem button key={8}>
        <ListItemIcon><CodeIcon /></ListItemIcon>
        <ListItemText primary='Developers'/>
      </ListItem>
    </a>
    <a href='https://vitalpoint.ai/docs-catalyst/'>
      <ListItem button key={9}>
        <ListItemIcon><SchoolIcon /></ListItemIcon>
        <ListItemText primary='Learn'/>
      </ListItem>
    </a>
    <a href='https://vitalpoint.ai/catalyst-contact/'>
      <ListItem button key={10}>
        <ListItemIcon><ContactSupportIcon /></ListItemIcon>
        <ListItemText primary='Contact'/>
      </ListItem>
    </a>
    </List>
</div>
)

return (
    <React.Fragment key={'left'}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
        <MenuIcon />
        </IconButton>
        
        <Drawer anchor={'left'} open={drawerState['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
        </Drawer>

        {addPersonaClicked ? <AddPersonaForm
            state={state}
            handleAddPersonaClick={handleAddPersonaClick}
        /> : null }

        {addDaoClicked ? <AddDaoForm
            state={state}
            handleAddDaoClick={handleAddDaoClick}
        /> : null }

        {addFTClicked ? <AddFTForm
          state={state}
          handleAddFTClick={handleAddFTClick}
        /> : null }

        {notificationsClicked ? 
        <NotificationCard
        toolbar={true}
        state={state}
        handleNotificationClick={handleNotificationClick}
        />: null
        }

    </React.Fragment>   
)
}
