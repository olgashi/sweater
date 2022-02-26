import React from 'react';
import { Container } from 'react-bootstrap';

export default function Alerts(props: { alerts: string; }) {
  const { alerts } = props;
  return (
    <Container className="alerts-container">
      <span>
      Warning! Alerts present! Type: {alerts}
      </span>
    </Container>
  )
}