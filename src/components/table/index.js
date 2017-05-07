import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPokemons, fetchTypes, fetchPokemonsByType } from '../../actions/index';
import { bindActionCreators } from 'redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import BusyWrapper from '../busyWrapper';
import BodyRow from './bodyRow';

class Home extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      searchValue: '',
      selectValue: 10
    };
  }

  componentWillMount() {
    this.props.fetchPokemons();
    this.props.fetchTypes();
  }

  handleChange = (event, index, value) => {
    this.setState({value, searchValue: ''});
    this.props.fetchPokemonsByType(value);
  };

  renderItems = () => {
    return this.props.types.map((type, index) => (
      <MenuItem value={type.url} key={index} primaryText={type.name} />
    ));
  }

  doFilter = (pokemons, searchValue) => {
    const filteredData = !searchValue ? pokemons :
          _.filter(pokemons, (p) => (`${p.name}`).toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    return _.isEmpty(filteredData) ? [] : filteredData;
  }

  render () {
    const { pokemons, types, loading } = this.props;
    const { searchValue, value } = this.state;
    const filteredData = this.doFilter(pokemons, searchValue);

    return (
      <div id="wrapper" className="toggled">
        <BusyWrapper isBusy={loading}>
          <Table
            selectable={false}
            height={'500px'}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan="4">
                  <div className="tableHeader">
                    <SelectField
                      floatingLabelText={types.length ? "Choose category": "Fetching ..."}
                      value={value}
                      onChange={this.handleChange}
                      maxHeight={200}
                    >
                      {this.renderItems()}
                    </SelectField>
                    <TextField
                      hintText="Type to search"
                      floatingLabelText="Search"
                      value={searchValue}
                      onChange={e => this.setState({ searchValue: e.target.value })}
                    />
                  </div>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn tooltip="Avatar">Avatar</TableHeaderColumn>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Width">Width</TableHeaderColumn>
                <TableHeaderColumn tooltip="Height">Height</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={true}
            >
              {filteredData && filteredData.map((pokemon, index) => (
                <BodyRow key={index} data={pokemon} />
              ))}
            </TableBody>
          </Table>
        </BusyWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pokemons , types, loading } = state.pokemons
  return { pokemons, types, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPokemons, fetchTypes, fetchPokemonsByType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
