import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';

function App() {
  return (
    <div className='nav-container'>
      <Header/>
      <Container>
        <TableUsers/>
      </Container>  
    </div>
  );
}

export default App;
