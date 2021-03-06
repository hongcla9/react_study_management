import React from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
hidden: {
display: 'none'
}
});


class CustomerAdd extends React.Component {

constructor(props) {

super(props);
this.state = {
file: null,
userName: '',
birthday: '',
gender: '',
job: '',
fileName: '',
open: false

}

this.handleFormSubmit = this.handleFormSubmit.bind(this)
this.handleFileChange = this.handleFileChange.bind(this)
this.handleValueChange = this.handleValueChange.bind(this)
this.addCustomer = this.addCustomer.bind(this)
this.handleClickOpen = this.handleClickOpen.bind(this)
this.handleClose = this.handleClose.bind(this);

}

handleFormSubmit(e) {
e.preventDefault()
this.addCustomer()
.then((response) => {
console.log(response.data);
this.props.stateRefresh();
})

this.setState({

file: null,
userName: '',
birthday: '',
gender: '',
job: '',
fileName: '',
open: false
})
}

handleFileChange(e) {
this.setState({
file: e.target.files[0],
fileName: e.target.value
});
}

handleValueChange(e) {
let nextState = {};
nextState[e.target.name] = e.target.value;
this.setState(nextState);
}

addCustomer(){
const url = '/api/customers';
const formData = new FormData();
formData.append('image', this.state.file)
formData.append('name', this.state.userName)
formData.append('birthday', this.state.birthday)
formData.append('gender', this.state.gender)
formData.append('job', this.state.job)
const config = {
headers: {
'content-type': 'multipart/form-data'
}
}
return post(url, formData, config)
}

handleClickOpen() {
this.setState({
open: true
});
}

handleClose() {
this.setState({
file: null,
userName: '',
birthday: '',
gender: '',
job: '',
fileName: '',
open: false
})
}
render() {
const { classes } = this.props;
return (
<div>
<Button variant="contained" color="primary" onClick={this.handleClickOpen}>
상품 추가하기
</Button>
<Dialog open={this.state.open} onClose={this.handleClose}>
<DialogTitle>상품 추가</DialogTitle>
<DialogContent>
<input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
<label htmlFor="raised-button-file">
<Button variant="contained" color="primary" component="span" name="file">
{this.state.fileName === ''? "상품 이미지 선택" : this.state.fileName}
</Button>
</label><br/>
<TextField label="상품명" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
<TextField label="상품번호" type="text" name="model" value={this.state.model} onChange={this.handleValueChange} /><br/>
<TextField label="사이즈" type="text" name="size" value={this.state.size} onChange={this.handleValueChange} /><br/>
<TextField label="색상" type="text" name="color" value={this.state.color} onChange={this.handleValueChange} /><br/>
</DialogContent>
<DialogActions>
<Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
<Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
</DialogActions>
</Dialog>
</div>

)

}

}



export default withStyles(styles)(CustomerAdd)
