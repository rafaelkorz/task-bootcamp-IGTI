import React, { useState, useEffect} from 'react';
import TableDespesas from './components/TableDespesas';
import { getCalendarsEndpoint } from './components/backend';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number;  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

function App() {
  const classes = useStyles();
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');

  const getFormatData = (ano: string, mes: string): string => {
    return `${ano}-${mes.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    getCalendarsEndpoint(getFormatData(ano, mes)).then((despesasAsync) => {
      setDespesas(despesasAsync);
  });
  }, [ano, mes])

  const handleChangeAno = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAno(event.target.value as string);
  };  

  const handleChangeMes = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMes(event.target.value as string);
  };  


  return (
    <div>  
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ano}
              onChange={handleChangeAno}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Mês</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mes}
              onChange={handleChangeMes}
            >
              <MenuItem value={1}>Janeiro</MenuItem>
              <MenuItem value={2}>Fevereiro</MenuItem>
              <MenuItem value={3}>Março</MenuItem>
              <MenuItem value={4}>Abril</MenuItem>
              <MenuItem value={5}>Maio</MenuItem>
              <MenuItem value={6}>Junho</MenuItem>
              <MenuItem value={7}>Julho</MenuItem>
              <MenuItem value={8}>Agosto</MenuItem>
              <MenuItem value={9}>Setembro</MenuItem>
              <MenuItem value={10}>Outubro</MenuItem>
              <MenuItem value={11}>Novembro</MenuItem>
              <MenuItem value={12}>Dezembro</MenuItem>
            </Select>
          </FormControl>   
        </div>
        
        <h2>Despesa total: {despesas.reduce((acc, item) => acc + item.valor, 0).toFixed(2)}</h2>
      </div>
      <TableDespesas despesas={despesas}/>
    </div>
  );
}

export default App;
