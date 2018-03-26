var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class ShowPost extends React.Component {
	constructor(props) {
		super(props);
		this.updatePost = this.updatePost.bind(this);
		this.getPost = this.getPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.state = {
			posts: [],
			preview: this.props.value == 'preview' ? true: false
		}
	}
	
	getPost() {
		var self = this;
		
		axios.post('/getPost', {
		 
		})
		.then(function (response) {
			console.log('res is ', response);
			self.setState({posts:response.data})
			
		})
		.catch(function (error) {
			console.log('error is ',error);
		});
	}
	
	componentDidMount() {
		this.getPost();
		document.getElementById('homeHyperlink').className = "active";
		document.getElementById('addHyperLink').className = "";
		document.getElementById('btnBlog').className = "";
	}
	
	updatePost(id) {	
		hashHistory.push('/addPost/' + id);
	}
	
	deletePost(id) {
		if(confirm('Are you sure you want to delete this post?')) {
			var self = this;
			axios.post('/deletePost', {
				id: id
			})
			.then(function (response) {
				self.getPost();
			})
			.catch(function (error) {
				console.log('Error is ', error);
			});
		}
	}
	
	render() {
		if (this.state.preview) {
			document.getElementById('homeHyperlink').className = "";
			document.getElementById('btnBlog').className = "active";
			
			return (
			<div className="list-group">
				{this.state.posts.map(function(post, index) {
						return <div key={index} className="post-item mb"><a href="#" calssName="list-group-item active">
							<h2 className="list-group-item-heading">{post.post_title}</h2></a>
							<p className="time">{post.post_date} | {post.post_time}</p>
							
							<hr/>
							<p className="list-group-item-tetx">{post.post_content}</p>
							<br/>
							</div>
						})
				}
			</div>
			)
		}
		else {
			return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Subject</th>
						<th className="center">Actions</th>
						
					</tr>
				</thead>
				<tbody>
					{
						this.state.posts.map(function(post,index) {
							 return <tr key={index} >
												<td>{index+1}</td>
												<td className="table-title"><a href="#/blogPreview">{post.post_title}</a></td>
												<td className="table-post">{post.post_content}</td>
												<td className="center">
													<span className="action" onClick={this.updatePost.bind(this, post.post_id)}>&#9999;</span>
												</td>
												<td className="center">
													<span className="action" onClick={this.deletePost.bind(this, post.post_id)}>&#10008;</span>
												</td>
											</tr>
						}.bind(this))
					}
				</tbody>
			</table>
				
			)
		}
	}
}

class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.getPostWithId = this.getPostWithId.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleSubjectChange = this.handleSubjectChange.bind(this);
		this.state = {
			title: '',
			subject: '',
			id: '',
			date: '',
			time: ''
			
		};
	}
	
	componentDidMount(){
    document.getElementById('addHyperLink').className = "active";
    document.getElementById('homeHyperlink').className = "";
		
		var param = this.props.params;
		if (param != undefined && param.id != undefined) {
			this.getPostWithId(param.id);
		}
  }
	
	handleTitleChange(e) {
		this.setState({title:e.target.value})
	}
	
	handleSubjectChange(e) {
		this.setState({subject:e.target.value})
	}
	
	addPost() {
		var timeList = dateTime();
		console.log("addPost");
		axios.post('/addPost', {
			title: this.state.title,
			subject: this.state.subject,
			id: this.state.id,
			date: timeList[0],
			time: timeList[1]
		})
		.then(function (response) {
			console.log('response from add post is ', response);
			hashHistory.push('/');
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	getPostWithId(id) {
		
		console.log("get post with id");
		
		var self = this;
		axios.post('/getPostWithId', {
			id: id
		})
		.then(function (response) {
			if (response) {
				
				self.setState({title:response.data[0].post_title});
				self.setState({subject:response.data[0].post_content});
				self.setState({id:response.data[0].post_id});
				self.setState({date:response.data[0].date});
				self.setState({date:response.data[0].time});
			}
		})
		.catch(function (error) {
			console.log('error is ', error);
		});
	}
	
	render() {
		return (
			<div>
				<div className="form-area">
					<form role="form">
					<br styles="clear::both" />
						<div className="form-group">
							<input value={this.state.title} type="text" onChange={this.handleTitleChange} id="title" name="title" placeholder="Title" required />
						</div>
						
						<div className="form-group">
							<textarea value={this.state.subject} onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
						</div>
						
						<button type="button" onClick={this.addPost} id="submit" name="submit" className="btn-add theme-color-green pull-right">Add message</button>
					</form>
				</div>
			</div>
		)
	}
}

function blogPreview(props) {
	return <ShowPost value={'preview'}/>;
}

function dateTime() {
	var date = new Date();
		var dateList = date.toString().split(" ");
		var one = [];
		var two = [];
		one.push(dateList[1]);
		one.push(dateList[2]);
		one.push(dateList[3]);
		two.push(dateList[4]);
		one = one.join("-");
		two = two.toString();
		
		var result = [];
		result.push(one);
		result.push(two);
		return result;
}


ReactDOM.render(
	<Router history={hashHistory}>
    <Route component={ShowPost} path="/"></Route>
		<Route component={blogPreview} path="/blogPreview"></Route>
		<Route component={AddPost} path="/addPost(/:id)"></Route>
  </Router>,
	document.getElementById('app')
);