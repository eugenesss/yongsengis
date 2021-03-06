import React, { Component } from "react";
import BgCard from "Components/BgCard";
import Button from "@material-ui/core/Button";
import Dropzone from "Components/Dropzone";

class ImportRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvToImport: [],
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }
  removeFile(file) {
    this.setState((state) => {
      const index = state.csvToImport.indexOf(file);
      const csvToImport = state.csvToImport.slice(0);
      csvToImport.splice(index, 1);
      return { csvToImport };
    });
  }
  handleUpload = (file) => {
    this.setState({
      csvToImport: file,
    });
  };
  onSubmit = () => {
    var data = new FormData();
    this.state.csvToImport.map((file) => data.append("fileupload", file));
    this.props.importAction(data);
  };

  render() {
    const { importType, importFile } = this.props;

    return (
      <React.Fragment>
        <BgCard heading={`Import ${importType} Records`}>
          <div className="mb-20">
            <p>
              1. Your CSV data should be in the format below. The first line of
              your CSV file should be the column headers as in the table
              example. Also make sure that your file is UTF-8 to avoid
              unnecessary encoding problems.
            </p>
            <p>
              2. If the column you are trying to import is date make sure that
              is formatted in format Y-m-d (2019-07-02)
            </p>
          </div>
          {importFile && (
            <div className="mb-20">
              <a href={importFile} target="_blank" download>
                <Button
                  className="bg-success text-white mb-20"
                  variant="contained"
                >
                  Download Sample Data
                </Button>
              </a>
            </div>
          )}
          <div className="w-100">
            <div className="py-20 pr-20">
              <Dropzone
                acceptFileTypes="text/csv"
                onDrop={this.handleUpload}
                onRemove={this.removeFile}
                uploadedFiles={this.state.csvToImport}
              />
            </div>
            <div className="d-flex mt-30">
              <Button
                onClick={() => this.onSubmit()}
                disabled={this.state.csvToImport.length < 1}
                color="primary"
                variant="contained"
                className="mr-10"
              >
                Import
              </Button>
            </div>
          </div>
        </BgCard>
      </React.Fragment>
    );
  }
}

export default ImportRecords;
