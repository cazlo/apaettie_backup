/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';

function withWindowSize(WrappedComponent) {
  return class WindowSizeProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        innerWidth: 800,
        innerHeight: 800,
      };
    }

    componentDidMount() {
      this.mounted = true;
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
    }

    componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
      if (!this.mounted) return;

      const node = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

      this.setState({
        innerWidth: node.getBoundingClientRect().width,
        innerHeight: node.getBoundingClientRect().height,
      });
    };

    render() {
      const { innerHeight, innerWidth } = this.state;
      return (
        <WrappedComponent
          ref={node => {
            this.node = node;
          }}
          key={`${innerHeight} ${innerWidth}`}
          {...this.props}
          {...this.state}
        />
      );
    }
  };
}

export default withWindowSize;
