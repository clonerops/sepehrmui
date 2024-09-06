import { useEffect, useRef } from "react";
import { toAbsoulteUrl } from "../helpers/assetsHelper";

import Stimulsoft from 'stimulsoft-reports-js';

const ReportViewer = () => {
    const viewerRef = useRef(null);
  
    useEffect(() => {      
      // Load the viewer in the container
      const viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
      viewer.renderHtml(viewerRef.current);
  
      // Load a report template (e.g., from your assets or backend)
      const report = new Stimulsoft.Report.StiReport();
      report.loadFile(toAbsoulteUrl('/reports/customerAccount.mrt')); // Path to your .mrt file
  
      // Set data from JSON
      report.dictionary.databases.clear(); // Clear any existing connections
      report.regData('YourDataName', 'YourDataAlias', { /* your JSON data */ });
  
      // Assign the report to the viewer
      viewer.report = report;
  
      // Show the report
      viewer.show();
    }, []);
  
    return <div ref={viewerRef} style={{ width: '100%', height: '600px' }}></div>;
  };
  
  export default ReportViewer;
  
