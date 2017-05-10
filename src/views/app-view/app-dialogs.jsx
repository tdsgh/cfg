import React, { Component, PropTypes } from 'react';
import LoginDlg from './dialogs/loginDlg';


//import './styles.css';

const dlgsMap = {
    login: LoginDlg
};


class AppDialogs extends Component {

    constructor(props) {
        super(props);
        this._appSubject = props.subject;

        this.state = {
            dlgType: "none"
        };
    }

    componentDidMount() {
        this._appSubject.filter((e) => (e.target == "dialog")).subscribe({
            next: this.onDialogCmd.bind(this)
        });
    }

    onDialogCmd(e) {
        this.setState({dlgType: e.type, subject: e.value});
    }

    render() {
        const DialogClass = dlgsMap[this.state.dlgType];
        if(DialogClass){
            console.log("app-dialogs: dialog type " + this.state.dlgType);
        return (
            <DialogClass subj={this.state.subject}>
            </DialogClass>
        );
        } else{
            console.log("app-dialogs: unknown dialog type " + this.state.dlgType);
            return null;
        }
    }
}

export default AppDialogs;
