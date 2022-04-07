import { Container } from 'react-bootstrap';

export default function Alerts(props) {
  const { alerts } = props;
  return (
    <Container className="alerts-container">
      <span>
      Warning! Alerts: Type: {alerts}
      </span>
    </Container>
  )
}