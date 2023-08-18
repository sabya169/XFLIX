import React,{ useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import "./Header.css"
import DialogItem from './Dialog'


function Header({children}){
    const [value,setValue] = useState(false)



    const handleDropDown = ()=>{
        setValue(true)
    }

   
    return(
        
        <Box className="header">
            <Box>
                <img className="logo-img" src="1.png"/>
                <img className="logo-img" src="Logo.png" alt="XFlix-logo"/>
            </Box>
            <Box className='header-input'>{children}<SearchIcon id="search-icon" sx={{backgroundColor:"red !important"}}/></Box>
            <Box> <Button sx={{backgroundColor:"red"}} onClick={handleDropDown} variant="contained"><UploadIcon />Upload</Button></Box>
            {value && <DialogItem/>}
        </Box>
        
    )
}
export default Header;