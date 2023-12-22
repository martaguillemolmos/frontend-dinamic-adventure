import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const TabBar = ({tabs, value, handler}) =>{

  return (
    <Box sx={{ width: '100%'}}>
      <Tabs value={value} onChange={handler}>
        {tabs.map((tab, index) => (
          <Tab 
          key={index} 
          label={tab.label} 
          value={tab.value}
          icon={tab.icon || (tab.value === 'null' ? <AccountCircleIcon /> : null)}
          sx={{ textTransform: 'none', 
          '&.Mui-focusVisible': {
            border: 'none',
          }, }}  
          />
        ))}
      </Tabs>
    </Box>
  );
}