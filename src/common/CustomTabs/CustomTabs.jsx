import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const TabBar = ({tabs, value, handler}) =>{

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handler} centered>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} value={tab.value}/>
        ))}
      </Tabs>
    </Box>
  );
}