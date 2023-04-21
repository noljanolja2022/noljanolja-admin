import MuiAccordion, { AccordionProps as MuiAccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary, { AccordionSummaryProps as MuiAccordionSummaryProps } from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SidebarAccordionSummary = styled((props: MuiAccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        sx={{
            '&:before': {
                display: 'none'
            }
        }}
        {...props}
    />
))(({ theme }) => ({
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    // backgroundColor:
    //   theme.palette.mode === 'dark'
    //     ? 'rgba(255, 255, 255, .05)'
    //     : 'rgba(0, 0, 0, .03)',
    // flexDirection: 'row-reverse',
    // '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    //   transform: 'rotate(90deg)',
    // },
    '& .MuiAccordionSummary-root': {
      height: '30px',
    },
    // '& .MuiAccordionSummary-gutters': {
    //     height: '10px',
    // }
}));

export const SidebarAccordion = styled((props: MuiAccordionProps) => (
    <MuiAccordion sx={{
        '&:before': {
            display: 'none',
        }
    }} {...props} />))(({ theme }) => ({
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        "& .MuiAccordion-root": {
            
        }
    }))
