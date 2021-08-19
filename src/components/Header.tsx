import { useHistory } from 'react-router';
import '../styles/header.scss'

export function Header() {
  const history = useHistory();
  return (
    <header className="header">
      <div>
        <img 
          src="/logo.svg" alt="to.do"
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </header>
  )
}