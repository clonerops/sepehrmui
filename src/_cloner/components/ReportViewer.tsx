import moment from 'moment-jalaali';
import React, { useEffect, useRef } from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

// Define an interface for the component props
interface ReportViewerProps {
	path: string; // Define the 'path' prop as a string
	data?: any;   // Define an optional 'data' prop to pass data to the report
}


const ReportViewer: React.FC<ReportViewerProps> = ({ path, data }) => {
	// Create a reference for the viewer container
	const viewerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		try {
			// Initialize the viewer options and set the license key
			const options = new Stimulsoft.Viewer.StiViewerOptions();
			Stimulsoft.Base.StiLicense.Key =
				'6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkO46nMQvol4ASeg91in+mGJLnn2KMIpg3eSXQSgaFOm15+0l' +
				'hekKip+wRGMwXsKpHAkTvorOFqnpF9rchcYoxHXtjNDLiDHZGTIWq6D/2q4k/eiJm9fV6FdaJIUbWGS3whFWRLPHWC' +
				'BsWnalqTdZlP9knjaWclfjmUKf2Ksc5btMD6pmR7ZHQfHXfdgYK7tLR1rqtxYxBzOPq3LIBvd3spkQhKb07LTZQoyQ' +
				'3vmRSMALmJSS6ovIS59XPS+oSm8wgvuRFqE1im111GROa7Ww3tNJTA45lkbXX+SocdwXvEZyaaq61Uc1dBg+4uFRxv' +
				'yRWvX5WDmJz1X0VLIbHpcIjdEDJUvVAN7Z+FW5xKsV5ySPs8aegsY9ndn4DmoZ1kWvzUaz+E1mxMbOd3tyaNnmVhPZ' +
				'eIBILmKJGN0BwnnI5fu6JHMM/9QR2tMO1Z4pIwae4P92gKBrt0MqhvnU1Q6kIaPPuG2XBIvAWykVeH2a9EP6064e11' +
				'PFCBX4gEpJ3XFD0peE5+ddZh+h495qUc1H2B';

			// Initialize the Stimulsoft viewer
			const viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);

			// Create a new report instance
			const report = Stimulsoft.Report.StiReport.createNewReport();

			// Load the report template
			report.loadFile(process.env.PUBLIC_URL + path);

			// Clear existing databases from the report
			report.dictionary.databases.clear();

			// Create a new DataSet instance
			const dataSet = new Stimulsoft.System.Data.DataSet("CustomerAccount");

			// Read JSON data into the dataset; ensure the structure matches the report expectations
			dataSet.readJson(data)

			// Register the dataset with the report
			report.regData("CustomerAccount", "CustomerAccount", dataSet);

			// Set a variable to the report if needed
			report.setVariable("NowDateTime", moment(new Date()).format('jYYYY/jMM/jDD'));

			// Set the report to the viewer and render it
			viewer.report = report;
			viewer.renderHtml(viewerRef.current?.id || '');

			// Clean up viewer on component unmount
			return () => {
				if (viewerRef.current) {
					viewerRef.current.innerHTML = ''; // Clear the viewer container
				}
			};
		} catch (error) {
			console.error('Error during report rendering:', error);
		}
	}, [path, data]);

	return <div id="viewerContent" ref={viewerRef} style={{ width: '100%' }}></div>;
};

export default ReportViewer;


