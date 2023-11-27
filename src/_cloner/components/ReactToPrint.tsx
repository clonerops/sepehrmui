import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  onPrint: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({ onPrint }) => {
  return (
    <button onClick={onPrint}>
      Print
    </button>
  );
};

interface ReusablePrintableComponentProps {
  renderPrintable: (contentRef: React.RefObject<HTMLDivElement>) => React.ReactNode;
}

const ReusablePrintableComponent: React.FC<ReusablePrintableComponentProps> = ({ renderPrintable }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <>
      <PrintButton onPrint={handlePrint} />
      {renderPrintable(contentRef)}
    </>
  );
};

export default ReusablePrintableComponent;
