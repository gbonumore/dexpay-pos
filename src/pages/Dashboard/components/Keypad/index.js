import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import KeypadKey from './KeypadKey';

const KeysContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem !important;
`;

const keyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ',', 0, 'C'];

class Keypad extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleChange } = this.props;
    const { value } = this.state;

    if (value !== prevState.value) {
      handleChange(value);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const { value } = this.state;
    let { key } = event;

    if (key === 'Enter') key = '=';

    if (/\d/.test(key)) {
      event.preventDefault();
      this.inputDigit(parseInt(key, 10));
    } else if (key === '.') {
      event.preventDefault();
      this.inputDot();
    } else if (key === 'Backspace') {
      event.preventDefault();
      this.clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault();

      if (value !== 0) {
        this.clearDisplay();
      } else {
        this.clearAll();
      }
    }
  };

  inputDigit = digit => {
    const { value } = this.state;
    let valueString = value;
    if (valueString === '0') {
      valueString = '';
    }
    const valueAdded = `${valueString}${digit}`;

    this.setState({
      value: valueAdded
    });
  };

  inputDot() {
    const { value } = this.state;
    const valueString = value;

    if (!/\./.test(valueString)) {
      const valueAdded = `${valueString}.`;
      this.setState({
        value: valueAdded
      });
    }
  }

  clearAll() {
    this.setState({
      value: '0'
    });
  }

  clearLastChar() {
    const { value } = this.state;

    this.setState({
      value: value.substring(0, value.length - 1) || '0'
    });
  }

  render() {
    return (
      <div>
        <KeysContainer className="columns is-mobile is-multiline">
          {keyNumbers.map(item => (
            <KeypadKey
              key={item}
              text={item.toString()}
              onClick={input => {
                if (input === ',') {
                  this.inputDot();
                } else if (input === 'C') {
                  this.clearAll();
                } else {
                  this.inputDigit(input);
                }
              }}
            />
          ))}
        </KeysContainer>
      </div>
    );
  }
}

Keypad.defaultProps = {
  value: '0'
};

Keypad.propTypes = {
  value: PropTypes.string
};

export default Keypad;