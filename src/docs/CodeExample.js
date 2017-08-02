import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'

// This way is easy, but adds 170K gzipped to bundle since all langs are included.
// import Highlight from 'react-highlight';

class CodeExample extends React.Component {
    componentDidMount() {
        //config highlight.js to use javascript in the rendered element as its syntax
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightBlock(this.element);
    }

    render() {
        return (
            <pre ref={ref => { this.element = ref }}>
        <code>
          {this.props.children}
        </code>
      </pre>
        )
    }
}

CodeExample.propTypes = {
    children: PropTypes.string.isRequired
}

export default CodeExample;


