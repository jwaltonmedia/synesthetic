#s.y.n.e.s.t.h.e.t.i.c#


##i see what you say...##
This project is an experiment, using WebRTC technology, to visualize data captured by the microphone and/or camera peripherals to ultimately deliver a 'synethetic' experience. Synesthesia is a neurological phenomenon in which stimulation of one sensory or cognitive pathway leads to automatic, involuntary experiences in a second sensory channel.  Due to the experimental nature of the technology used in this project, we recommend running the web client in Google Chrome or Firefox (latest).

##getting started##
You will need to install and be familiar with the following in order to run this project.

* [Node](http://nodejs.org/)
* Sass ([Compass](http://compass-style.org/install/))
* [Grunt](http://gruntjs.com/getting-started)

### installing Node ###
Excellent instructions for installing Node.js across various operating systems can be found at the [How to Node](http://howtonode.org/how-to-install-nodejs) website.

It is common for users of Node.js to use `sudo` when installing or managing packages. We discourage this. Instead, configure ownership of your `/usr/local/` directory as follows: `sudo chown -R $USER /usr/local` once, and you should never need to `sudo` your package management.  Much safer.

### installing Grunt ###
Grunt requires Node.js to be installed prior to installation.  To install Grunt, simply type `npm install grunt` in your terminal shell.  Grunt is a very useful tool, and we recommend installing it at the global level.  To do so, add the `-g` option as such: `npm install grunt -g`.

### installing Sass ###
If Ruby is installed on your machine (pre-installed on Mac), then installation of Sass is as simple as typing `gem install sass` at your command line.  There is a chance you may need to be logged in as a super-user for this to work, in which case use `sudo gem install sass` instead.

Double check that Sass has installed by typing `sass -v`.  You should be returned a version number if Sass has successfully installed.

### installing Compass ###
The installation of Compass is identical to the installation of Sass. If Ruby is installed, then enter `gem install compass` at your command line.  There is a chance you may need to be logged in as a super-user for this to work, in which case use `sudo gem install compass` instead.

## running the project ##
Clone the project locally, and from the terminal run `npm install` from the project root. Allow time for all the `grunt` packages to download.

When that has finished, run `grunt` from the command line.  This will start a server at 'localhost:3000'.

Navigate to: `localhost:3000`.

You should be in business.

## contributing ##
The only rule here is...