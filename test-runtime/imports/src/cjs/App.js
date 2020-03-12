const React = require('react');
const Text = require('../../../../dist/src/Text');

class App extends React.Component {
  state = {
    text: 'hey',
  };
  render() {
    return (
      <div data-name="App" style={{ width: 30 }}>
        <Text.default ellipsis data-name="CJS-Text">
          {this.state.text}
        </Text.default>
        <button
          data-name="button"
          onClick={() =>
            this.setState({
              text: 'heyheyheyheyheyheyheyheyheyheyheyheyheyhey',
            })
          }
        />
      </div>
    );
  }
}

module.exports = App;
