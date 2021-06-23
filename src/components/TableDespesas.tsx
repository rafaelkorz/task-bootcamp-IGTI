import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number
}

interface IParamTable {
  despesas: IDespesas[];
}

export default function TableDespesas(props: IParamTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Despesa</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Dia</TableCell>
            <TableCell align="left">Valor&nbsp;(R$)</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.despesas.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.descricao}</TableCell>
              <TableCell align="left">{row.categoria}</TableCell>
              <TableCell align="left">{row.dia}</TableCell>
              <TableCell align="left">{row.valor}</TableCell>                            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}