// ReusableAccordion.tsx
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ReusableAccordionProps {
  title: string;
  content: React.ReactNode;
}

const ReusableAccordion: React.FC<ReusableAccordionProps> = ({ title, content }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
    </Accordion>
  );
};

export default ReusableAccordion;
