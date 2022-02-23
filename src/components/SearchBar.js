import { Row, InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar(props) {
  return (
    <Row>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Entere City and State or Zipcode"
          aria-label="Entere City and State or Zipcode"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary">
          Get Weather
        </Button>
      </InputGroup>
    </Row>
  )


}