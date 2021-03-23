import logoImg from '../../assets/Logo.svg';

import { Container, Content } from './styles';

interface HeaderProps {
  onHandleToggleModalOpen: () => void;
}

export function Header({ onHandleToggleModalOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="mm money" />
        <button type="button" onClick={onHandleToggleModalOpen}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
