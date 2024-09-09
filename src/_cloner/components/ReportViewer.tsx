import React from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

// Define an interface for the component props
interface ReportViewerProps {
  path: string; // Define the 'path' prop as a string
  data?: any;   // Define an optional 'data' prop to pass data to the report
}

// Sample JSON Data
const JSONData = [
  {
    "DocType": "2024-09-06T00:00:00",
  }
];

class ReportViewer extends React.Component<ReportViewerProps> {
  private options: Stimulsoft.Viewer.StiViewerOptions;
  private viewer: Stimulsoft.Viewer.StiViewer;

  constructor(props: ReportViewerProps) {
    super(props);

    // Initialize the viewer options and set the license key
    this.options = new Stimulsoft.Viewer.StiViewerOptions();
    Stimulsoft.Base.StiLicense.Key =
      '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkO46nMQvol4ASeg91in+mGJLnn2KMIpg3eSXQSgaFOm15+0l' +
      'hekKip+wRGMwXsKpHAkTvorOFqnpF9rchcYoxHXtjNDLiDHZGTIWq6D/2q4k/eiJm9fV6FdaJIUbWGS3whFWRLPHWC' +
      'BsWnalqTdZlP9knjaWclfjmUKf2Ksc5btMD6pmR7ZHQfHXfdgYK7tLR1rqtxYxBzOPq3LIBvd3spkQhKb07LTZQoyQ' +
      '3vmRSMALmJSS6ovIS59XPS+oSm8wgvuRFqE1im111GROa7Ww3tNJTA45lkbXX+SocdwXvEZyaaq61Uc1dBg+4uFRxv' +
      'yRWvX5WDmJz1X0VLIbHpcIjdEDJUvVAN7Z+FW5xKsV5ySPs8aegsY9ndn4DmoZ1kWvzUaz+E1mxMbOd3tyaNnmVhPZ' +
      'eIBILmKJGN0BwnnI5fu6JHMM/9QR2tMO1Z4pIwae4P92gKBrt0MqhvnU1Q6kIaPPuG2XBIvAWykVeH2a9EP6064e11' +
      'PFCBX4gEpJ3XFD0peE5+ddZh+h495qUc1H2B';

    // Initialize the Stimulsoft viewer
    this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  }

  render() {
    return <div id="viewerContent"></div>;
  }

  componentDidMount() {
    // Create a new report instance
    const report = Stimulsoft.Report.StiReport.createNewReport();

    // Load the report template
    report.loadFile(process.env.PUBLIC_URL + this.props.path);

    // Clear existing databases from the report
    report.dictionary.databases.clear();

    // Create a new DataSet instance
    const dataSet = new Stimulsoft.System.Data.DataSet("GetCustomerBillingReport");

	report.setVariable("sepehrtest", "abolfazlmasoumi")

    // Read JSON data into the dataset; ensure the structure matches the report expectations
    dataSet.readJson(JSONData);

    // Register the dataset with the report
    report.regData(dataSet.dataSetName, "", dataSet);

    // Set the report to the viewer and render it
    this.viewer.report = report;
    this.viewer.renderHtml('viewerContent');
  }
}

export default ReportViewer;
