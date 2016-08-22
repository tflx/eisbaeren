import React, { Component } from 'react';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class Score extends Component {

  state = {
    table: null,
    fetching: false
  };

  componentDidMount() {
    this.getScore();
  }

  getScore() {
    this.setState({fetching: true});
    const options = {
      method: 'GET',
      hostname: 'https://extraction.import.io/query/extractor/e15378eb-8317-4417-9dd2-3b851ce2c649?_apikey=37f9da863e404efa8af4670f21d1b7c29c826c468ba751223a67b7ac33f65b67b39ee5dbc4f507eb3ebd2231a37237de3b042dd18a2ed8135e998b87d373e51807ab6c86a1d3a7539985733169d7a192&url=http%3A%2F%2Fresultater.dai-sport.dk%2Ftms%2FTurneringer-og-resultater%2FPulje-Stilling.aspx%3FPuljeId%3D301'
    };
    fetch(options.hostname, options)
      .then((response) => response.json().then((json) => {
        const arr = json.extractorData.data[0].group;
        this.setState({fetching: false});
        this.setState({table: arr});
      }));
  }

  getPlayed(position) {
    const v = parseInt(position['V number'][0].text, 10);
    const u = parseInt(position['U number'][0].text, 10);
    const t = parseInt(position['T number'][0].text, 10);
    return (v + u + t);
  }

  render() {
    console.log(this.state.table);

    const cellStyle = {
      width: '20px',
      padding: '0px',
      textAlign: 'right'
    };

    const cellNoStyle = Object.assign({}, cellStyle);
    cellNoStyle.textAlign = 'left';
    cellNoStyle.fontWeight = '700';

    const nameCellStyle = {
      width: '150px',
      padding: '0px'
    };

    const cellPointStyle = Object.assign({}, cellNoStyle);
    cellPointStyle.textAlign = 'right';
    cellPointStyle.width = '40px';

    return (
      <div>
        <H1>Score</H1>
        {this.state.fetching ? <Loader centered /> : null}
        {this.state.table ?
          <Table selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={cellNoStyle}>#</TableHeaderColumn>
                <TableHeaderColumn style={nameCellStyle}>Name</TableHeaderColumn>
                {/* <TableHeaderColumn>K</TableHeaderColumn>*/}
                <TableHeaderColumn style={cellStyle}>V</TableHeaderColumn>
                <TableHeaderColumn style={cellStyle}>U</TableHeaderColumn>
                <TableHeaderColumn style={cellStyle}>T</TableHeaderColumn>
                {/* <TableHeaderColumn>Score</TableHeaderColumn>*/}
                <TableHeaderColumn style={cellPointStyle}>P</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.state.table.map((position, index) => (
                <TableRow selectable={false} key={index}>
                  <TableRowColumn style={cellNoStyle}>{index}</TableRowColumn>
                  <TableRowColumn style={nameCellStyle}>{position['Hold link'][0].text}</TableRowColumn>
                  {/* <TableRowColumn style={cellStyle}>{this.getPlayed(position)}</TableRowColumn>*/}
                  <TableRowColumn style={cellStyle}>{position['V number'][0].text}</TableRowColumn>
                  <TableRowColumn style={cellStyle}>{position['U number'][0].text}</TableRowColumn>
                  <TableRowColumn style={cellStyle}>{position['T number'][0].text}</TableRowColumn>
                  {/* <TableRowColumn>{position['Score number 1'][0].text} - {position['Score number 2'][0].text}</TableRowColumn>*/}
                  <TableRowColumn style={cellPointStyle}>{position['P number'][0].text}</TableRowColumn>
                </TableRow>)
              )}
            </TableBody>
          </Table>
          : null
        }
      </div>
    );
  }
}
