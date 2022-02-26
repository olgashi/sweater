import { Container } from 'react-bootstrap';

export default function Alerts(props) {
  const { alerts } = props;
  return (
    <Container className="alerts-container">
      <span>
      Warning! Alerts present! Type: {alerts}
      </span>
    </Container>
  )
}