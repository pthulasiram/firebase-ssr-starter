/* globals document, window */
import React from 'react';
import { List } from 'rmwc/List';

import ThreeBounceLoader from '../loaders/three-bounce-loader';

import '@material/list/dist/mdc.list.min.css';

export default class InfiniteScrollList extends React.Component {
  constructor() {
    super();

    this.loader = React.createRef();
    this.debounceTimer = 0;
    this.__evaluateLoader = this.evaluateLoader.bind(this);
  }

  get viewportHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  get loaderTop() {
    return this.loader.current && this.loader.current.getBoundingClientRect().top;
  }

  get isLoaderVisible() {
    return this.loaderTop < this.viewportHeight;
  }

  get debounceMillis() {
    return this.props.debounce || 1 * 1000;
  }

  componentDidMount() {
    window.document.addEventListener('scroll', this.__evaluateLoader);
  }

  componentDidUpdate() {
    this.evaluateLoader();
  }

  componentWillUnmount() {
    window.document.removeEventListener('scroll', this.__evaluateLoader);
  }

  evaluateLoader() {
    this.debounceTimer && clearTimeout(this.debounceTimer);

    this.debounceTimer =
      this.isLoaderVisible &&
      setTimeout(() => {
        !this.props.isFinished && this.props.next();
      }, this.debounceMillis);
  }

  render() {
    const { children, name, next, isFinished } = this.props;

    return (
      <div name={name}>
        <List>{children}</List>
        {!isFinished && (
          <div ref={this.loader}>
            <ThreeBounceLoader />
          </div>
        )}
      </div>
    );
  }
}
