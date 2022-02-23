import { Row, InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar(props) {
  return (
    <Row>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Entere City and State or Zipcode"
          aria-label="Entere City and State or Zipcode"
          aria-describedby="basic-addon2"
          id="zip-code-input"

        />
        <Button variant="outline-secondary" onClick={props.handleClick}>
          Get Weather
        </Button>
      </InputGroup>
    </Row>
  )


}