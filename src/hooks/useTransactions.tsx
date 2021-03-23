import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  createdAt: string;
  category: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionContext {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContext>(
  {} as TransactionContext
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('/transactions')
      .then(({ data: transactionsReturned }) =>
        setTransactions(transactionsReturned.transactions)
      );
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const { data: transactionCreated } = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date(),
    });

    setTransactions((oldTransactions) => [
      ...oldTransactions,
      transactionCreated.transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
