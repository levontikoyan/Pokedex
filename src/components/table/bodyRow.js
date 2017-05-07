import React, {PureComponent} from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';

class BodyRow extends PureComponent {
  render () {
    const { avatar, name, weight, height } = this.props.data;
    return (
      <TableRow key={this.props.key} style={{ height: '70px' }}>
        <TableRowColumn>
          <Avatar src={avatar} />
        </TableRowColumn>
        <TableRowColumn style={{textTransform: 'capitalize'}}>{name}</TableRowColumn>
        <TableRowColumn>{weight}</TableRowColumn>
        <TableRowColumn>{height}</TableRowColumn>
      </TableRow>
    );
  }
}

export default BodyRow;
