import React from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

class ReportViewer extends React.Component {
	private options: Stimulsoft.Viewer.StiViewerOptions;
	private viewer: Stimulsoft.Viewer.StiViewer;
	
	constructor(props: any) {
		super(props);
		
		this.options = new Stimulsoft.Viewer.StiViewerOptions();
		this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, "StiViewer", false);
	}

	render() {
		return (
			<div className="App">
				<div id="viewerContent"></div>
			</div>
		);
	}
	
	componentDidMount() {
		var report = Stimulsoft.Report.StiReport.createNewReport();
		// report.loadFile(process.env.PUBLIC_URL + 'reports/Report.mrt');
		report.loadFile(process.env.PUBLIC_URL + 'reports/InvoiceSoftware.mdc');

		this.viewer.report = report;
		this.viewer.renderHtml("viewerContent");
	}

	
    
}

export default ReportViewer;




