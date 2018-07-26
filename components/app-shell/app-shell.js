/* globals firebase */
import React from 'react';
import { withRouter } from 'next/router';
import { Provider } from 'unistore/react';
import { mappedActions, store } from '../../datastore';

// Head tags
import FontsHead from '../head/fonts';
import MetaHead from '../head/meta';
import { AppStyle } from '../head/styles';

// Components
import Authentication from '../authentication/authentication';
import PrimaryAppBar from '../app-bar/primary-app-bar';
import PermanentDrawer from '../drawer/permanent-drawer';
import TemporaryDrawer from '../drawer/temporary-drawer';
import ErrorHandler from '../error-handler/error-handler';
import FirebaseScripts from './firebase';
import Content from './content';
import Messaging from './messaging';

import './app-shell.css';

export class AppShell extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  get firebase() {
    return firebase;
  }

  componentDidMount() {
    mappedActions.setRouter(this.props.router);
  }

  render() {
    const { admin, children, secure, url } = this.props;
    const title = 'Firebase SSR';

    return (
      <>
        <MetaHead title={title} />
        <FontsHead />
        <AppStyle />
        <Provider store={store}>
          <div className="app-shell">
            <>
              <Authentication admin={admin} secure={secure} url={url} />
              <Messaging />
            </>

            <ErrorHandler />
            <PrimaryAppBar title={title} />
            <TemporaryDrawer />
            <Content>
              <div className="permanent-drawer">
                <PermanentDrawer />
              </div>
              <main>{children}</main>
            </Content>
          </div>
        </Provider>
        <FirebaseScripts firebaseEnv={this.state.environment.firebase} />
      </>
    );
  }
}

export default withRouter(AppShell);
