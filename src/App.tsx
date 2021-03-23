import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  );

  return (
    <TransactionsProvider>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onHandleToggleModalOpen={() =>
          setIsNewTransactionModalOpen(!isNewTransactionModalOpen)
        }
      />
      <Header
        onHandleToggleModalOpen={() =>
          setIsNewTransactionModalOpen(!isNewTransactionModalOpen)
        }
      />
      <Dashboard />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
