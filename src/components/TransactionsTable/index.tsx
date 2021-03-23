import { useTransactions } from '../../hooks/useTransactions';

import { Container, WithoutTransactions } from './styles';

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      {transactions.length ? (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(
              ({ id, title, amount, createdAt, category, type }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td className={type}>
                    {type === 'withdraw' ? '- ' : ''}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(amount)}
                  </td>
                  <td>{category}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(createdAt)
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <WithoutTransactions>Adicione novas transações</WithoutTransactions>
      )}
    </Container>
  );
}
