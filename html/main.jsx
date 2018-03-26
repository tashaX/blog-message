var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;


class Signin extends React.Component {
	constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        email:'',
        password:''
      };
    }
	
	signIn() {
			axios.post('/signin', {
			email: this.state.email,
			password: this.state.password
		})
		.then(function (response) {
			if(response.data == 'success') {
				window.location.assign('http://localhost:7777/home');
			}	
			else {
				alert("Wrong username or password!");
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	handleEmailChange(e) {
		this.setState({email:e.target.value})
	}
	
	handlePasswordChange(e) {
		this.setState({password:e.target.value})
	}
	
	render() {
		return (
			<div className="anim-right">
				<div className="link-switch mr">
						<Link to="/signup">{'Signup'}</Link>
					</div>
				<form className="form-signin">
					<h2 className="form-heading"> PLEASE SIGN IN</h2>
					<label for="inputEmail">EMAIL ADRESS</label>
					<input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
					<label for="inputPassword">PASSWORD</label>
					<input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />	
					<button onClick={this.signIn} className="btn-signin max-width theme-color-green" type="button"> Sign in</button>
				</form>
				
			</div>
		)
	}
}

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.signUp = this.signUp.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}
	
	handleNameChange(e) {
		this.setState({name:e.target.value})
	}
	
	handleEmailChange(e){
    this.setState({email:e.target.value})
	}   
	
	handlePasswordChange(e){
    this.setState({password:e.target.value})
	}
	
	signUp() {
		axios.post('/signup', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		})
		.then(function (response) {
			hashHistory.push('/');
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	
	render() {
		return (
			<div className="anim-left">
				<div className="link-switch mr">
          <Link to="/">{'Signin'}</Link>
        </div>
				<form className="form-signin">
					<h2 className="form-heading">PLEASE SIGN UP</h2>
					<label for="inputName">Name</label>
					<input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autofocus />
					<label for="inputEmail">Email address</label>
					<input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
					<label for="inputPassword">Password</label>
					<input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required /> 
					<button className="btn-signin theme-color-green max-width" onClick={this.signUp} type="button">Sign up</button>
				</form>

			</div>
		)
	}
}


ReactDOM.render(
	<Router history={hashHistory}>
		<Route component={Signin} path="/"></Route>
		<Route component={Signup} path="/signup"></Route>
	</Router>,
	document.getElementById('app')
);