import React, { Component } from 'react';
import H1 from 'components/H1';
import Loader from 'components/Loader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import config from '../../../mock-api/config.json';

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
      hostname: config.dai.api
    };
    fetch(options.hostname, options)
      .then((response) => response.json().then((json) => {
        // console.log(json);
        const arr = json.extractorData.data;
        this.setState({table: arr, fetching: false});
      }));
  }

  cellStyle = {
    width: '20px',
    padding: '0px',
    textAlign: 'right'
  };

  cellNoStyle = {...this.cellStyle, ...{textAlign: 'left', fontWeight: '700'}};
  nameCellStyle = {
    width: '150px',
    padding: '0px'
  };

  cellPointStyle = {...this.cellNoStyle, ...{textAlign: 'right', width: '40px'}};

  renderTable() {
    const rows = [];

    rows.push(this.state.table.map((row, index) => {
      const scoreRow = row.group[0];
      let teamStyle = {};
      if (scoreRow.team[0].text.includes(config.name)) {
        teamStyle = {
          color: config.colors.primary
        };
      }

      return (
        <TableRow style={teamStyle} selectable={false} key={index}>
          <TableRowColumn style={this.cellNoStyle}>{index + 1}</TableRowColumn>
          <TableRowColumn style={this.nameCellStyle}>{scoreRow.team[0].text}</TableRowColumn>
          <TableRowColumn style={this.cellStyle}>{scoreRow.won[0].text}</TableRowColumn>
          <TableRowColumn style={this.cellStyle}>{scoreRow.tie[0].text}</TableRowColumn>
          <TableRowColumn style={this.cellStyle}>{scoreRow.lost[0].text}</TableRowColumn>
          <TableRowColumn style={this.cellPointStyle}>{scoreRow.points[0].text}</TableRowColumn>
        </TableRow>
      );
    }));

    return rows;
  }

  render() {
    return (
      <div>
        <H1>Score</H1>
        {this.state.fetching ? <Loader centered /> : null}
        {this.state.table ?
          <Table selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={this.cellNoStyle}>#</TableHeaderColumn>
                <TableHeaderColumn style={this.nameCellStyle}>Klub</TableHeaderColumn>
                <TableHeaderColumn style={this.cellStyle}>V</TableHeaderColumn>
                <TableHeaderColumn style={this.cellStyle}>U</TableHeaderColumn>
                <TableHeaderColumn style={this.cellStyle}>T</TableHeaderColumn>
                <TableHeaderColumn style={this.cellPointStyle}>P</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderTable()}
            </TableBody>
          </Table>
          : null
        }
      </div>
    );
  }
}
