# Signinup_back
This project contains the backend of Signinup flow in **React** which is required every now and then, I've created this repository such that anyone in order to focus on his/her main project can pic this and continue to the main project.

**Frontend [here](https://github.com/abhinavsri360/React-Signin-Signup_flow)** Backend is created using mongodb, express and passport. Contributors are welcome.

All you need is a URI that's all and you can have this flow up and running anytime anywhere.

Contributions will be a great help as this is still under construction.

Thank you so much for visiting this repository :heart: Liked this? :star: Want to Contribute? :fork_and_knife:

Contribution to this can be a huge step to Open-Source and a great help to many developers out here :smile:

# Get project running

Make sure your mongodb server is up and running. If not install Mongodb, create a directory named _"Mongodb"_ anywhere cd into that make another directory named _"data"_. Now in the _"Mongodb"_ directory open the terminal and run the command given below. Then you're good to go. Keep this running and advance to the instructions further.
```yaml
mongod --dbpath=data --bind_ip 127.0.0.1
```

_Fork_ :fork_and_knife: and _Clone_ the project further run the commands given below in the command terminal inside the project directory.

```yaml
npm install
npm start
```

Test using postman or with the Frontend flow or maybe with your configured frontend.
- GET request: http://localhost:5000/user
- REGISTER USER: http://localhost:5000/user/register
- Login USER: http://localhost:5000/user/login
