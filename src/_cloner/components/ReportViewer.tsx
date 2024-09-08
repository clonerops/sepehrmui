import React from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

class ReportViewer extends React.Component {
	private options: Stimulsoft.Viewer.StiViewerOptions;
	private viewer: Stimulsoft.Viewer.StiViewer;
	
	constructor(props: any) {
		super(props);

		
		this.options = new Stimulsoft.Viewer.StiViewerOptions();
		// Stimulsoft.Base.StiLicense.key = '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkgpgFGkUl79uxVs8X+uspx6K+tqdtOB5G1S6PFPRrlVNvMUiSiNYl724EZbrUAWwAYHlGLRbvxMviMExTh2l9xZJ2xc4K1z3ZVudRpQpuDdFq+fe0wKXSKlB6okl0hUd2ikQHfyzsAN8fJltqvGRa5LI8BFkA/f7tffwK6jzW5xYYhHxQpU3hy4fmKo/BSg6yKAoUq3yMZTG6tWeKnWcI6ftCDxEHd30EjMISNn1LCdLN0/4YmedTjM7x+0dMiI2Qif/yI+y8gmdbostOE8S2ZjrpKsgxVv2AAZPdzHEkzYSzx81RHDzZBhKRZc5mwWAmXsWBFRQol9PdSQ8BZYLqvJ4Jzrcrext+t1ZD7HE1RZPLPAqErO9eo+7Zn9Cvu5O73+b9dxhE2sRyAv9Tl1lV2WqMezWRsO55Q3LntawkPq0HvBkd9f8uVuq9zk7VKegetCDLb0wszBAs1mjWzN+ACVHiPVKIk94/QlCkj31dWCg8YTrT5btsKcLibxog7pv1+2e4yocZKWsposmcJbgG0';
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




