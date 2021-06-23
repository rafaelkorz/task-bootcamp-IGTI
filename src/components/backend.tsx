export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number
}

export function getCalendarsEndpoint(from: string): Promise<IDespesas[]> {
  return fetch(`http://localhost:3001/despesas?mes=${from}&_sort=dia`, {
    credentials: "include",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}