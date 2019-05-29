import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import ButtonAppBar from './components/ButtonAppBar.js';
// import SendButtons from './components/SendButton';
import './styles/App.css';
import TextInput from './components/TextInput.js';
import AlignItemsList from './components/AlignItemsList';
import {dispatch} from 'rxjs/internal/observable/range';

import {firebaseDb} from './firebase';
const messagesRef = firebaseDb.ref('messages');

class App extends Component {
  componentWillMount() {
    messagesRef.on('child_added', snapshot => {
      console.log(this.props);
      const m = snapshot.val();
      const {submit} = this.props;

      let msgs = submit.messages;

      msgs.push({
        image: m.image,
        text: m.text,
      });

      this.setState({
        messages: msgs,
      });
    });
  }

  render() {
    const {submit} = this.props;

    return (
      <React.Fragment>
        <ButtonAppBar />
        <div className="App">
          {submit.messages.map((m, i) => (
            <AlignItemsList key={i} message={m} />
          ))}
          <TextInput value={submit.value} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  submit: state.submit,
});

export default connect(mapStateToProps)(App);
