var express = require('express');
var passport = require('passport');
var session = require("express-session");
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github2').Strategy;
var path = require('path');
var fs = require('fs');
var request = require('request');
var https = require('https');


//var GITHUB_CLIENT_ID = "--insert-github-client-id-here--";
//var GITHUB_CLIENT_SECRET = "--insert-github-client-secret-here--";


var wso2_sp = require('./wso2/service-provider');
var wso2_user = require('./wso2/user');
var wso2_usertest = require('./wso2/user-test');


var server_options = {
    cert: fs.readFileSync('certs/client-crt.pem'),
    key: fs.readFileSync('certs/client-key.pem'),
    ca: fs.readFileSync('certs/ca-crt.pem'),
	requestCert: false, 
	rejectUnauthorized: false
};

/*
var client_options = {
	cert: fs.readFileSync('certs/client-crt.pem'),
	key: fs.readFileSync('certs/client-key.pem'),
	ca: fs.readFileSync('certs/ca-crt.pem'),
};
*/

/*
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
*/

var app = express();
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
//app.use(passport.initialize());
//app.use(passport.session());



  
  
  

/* Routes */
/*
app.post('/login',
	passport.authenticate('local'), {
		successRedirect: '/',
		failureRedirect: '/404',
		failureFlash: true
	}
);
*/
  
/*
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
	
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });
  
// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
  
app.get('/auth/github/callback', 
	passport.authenticate('github', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	}
);
  
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}
*/
  

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


app.get('/service', (req, res)=> {
	req.query.userName = "admin"; // only for testing
	if(req.query.userName==null) return res.status(400).send("userName missing");
	
	wso2_sp.getSP({
			userName: req.query.userName
	}, (response)=> {
		if(response.code==200) {
			res.status(response.code).send(response.result);
		} else {
			res.status(response.code).send(response.message);
		}
	});
});

app.post('/service', (req, res)=> {
	wso2_sp.saveSP(req.body, (response)=> {
		res.status(response.code).send(response.message);
	});
});

app.post('/service-delete', (req, res)=> {
	
	// delete service provider
	wso2_sp.deleteSP(req.body, (response)=> {
		
		// delete users of this application that are not admin
		wso2_user.getUsers({
				roleName: "Application/" + req.body.applicationName
		}, (response)=> {
			
			wso2_user.deleteUser(response.result, (response)=> {
				res.status(response.code).send(response.message);
			});	
		});
	});
});

app.get('/user', (req, res)=> {
	roleName = "";
	if(req.query.public!=null) {
		roleName = "PUBLIC";
		
	} else {
		if(req.query.applicationName==null) { res.status(400).send("applicationName missing"); return; }
		roleName = "Application/" + req.query.applicationName;
	}
	
	wso2_user.getUsers({
			roleName: roleName
	}, (response)=> {
		if(response.result==[] && req.query.applicationName=="PING") response.result="";
		res.status(response.code).send(response.result);
	});
});

app.post('/user', (req, res)=> {
	wso2_user.saveUser(req.body, (response)=> {
		res.status(response.code).send(response.message);
	});
});

app.post('/user-delete', (req, res)=> {
	wso2_user.deleteUser(req.body, (response)=> {
		res.status(response.code).send(response.message);
	});
});


// test users preload
app.get('/user-upload', (req, res)=> {
	wso2_usertest.uploadUsers((response)=> {
		res.status(response.code).send(response.message);
	});		
});



https.createServer(server_options, app).listen(8080, function () {
	console.log("\nSPID IDP BackOffice Client Running\nversion: 1.1\n");
});

