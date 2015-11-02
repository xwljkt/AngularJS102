// create the module and name it scotchApp
var app = angular.module('AngularJS102', ['ngRoute',"ngTable", "ngTableDemos"]);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/workshop/Student', {
            templateUrl : 'workshop/Student-view.html',
            controller  : 'StudentController'
        })
        .when('/workshop/User', {
            templateUrl : 'workshop/User-view.html',
            controller  : 'UserController'
        })
        .when('/workshop/PlayList', {
            templateUrl : 'workshop/PlayList-view.html',
            controller  : 'PlayListController'
        })
        // route for the contact page
        .when('/HomeworkAssignments/ThemePicker', {
            templateUrl : 'HomeworkAssignments/UIThemePicker-view.html',
            controller  : 'UIThemePickerController'
        })
        .when('/HomeworkAssignments/Simon', {
            templateUrl : 'HomeworkAssignments/Simon-view.html',
            controller  : 'SimonController'
        });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Welcome to AngularJS 102 class!';
});

app.controller('StudentController', function($scope, Calculator, Student) {
    var self = this;
    self.name = null;
    self.avg = null;
    self.grd = null;
    self.passing = null;
    self.students = [];
    self.names = [];

    self.addTask =function (name, task, score){
        var assignment = {
            task:task,
            score:score
        };
        if(self.names.length==0 || !(self.names.indexOf(name) > -1)) {
            console.log("new student");
            self.student = new Student(name);
            self.students.push(self.student);
            self.names.push(name);
        }
        self.student = getStudent(name);
        self.student.addAssignment(assignment);
        self.avg = self.student.average();
        self.grd = self.student.grade();
        self.passing = self.student.passed();
        console.log(self.students);
    };

    function getStudent (name){
        for(var i=0;i<self.students.length;i++){
            if(self.students[i].name == name)
                return self.students[i];
        }
    }
});

app.controller('PlayListController', function($scope, MusicProfile){
    var self = this;
    self.genre = {
        Pop:['Crazy 1', 'Hola 2', 'Im awesome 3'],
        Rock:['Rock and roll 1', 'Die hard 2', 'Earthquick 3'],
        Rap:['Fast and furious 1', 'Cannot keep up with you 2', 'General Taos 3']
    };
    self.playList = [];
    self.selectedGenre = self.genre.Pop;
    self.selectedType = 'clean';
    self.name = null;
    self.age = null;
    self.names = [];
    self.profiles = [];

    self.addSong = function(song){
        if(self.playList.indexOf(song)> -1){
            var index = self.playList.indexOf(song);
            if (index !== -1) {
                self.playList.splice(index, 1);
            }
        }
        else
            self.playList.push(song);
    };

    self.showPlayList = function(){
        if(self.names.length==0 || !(self.names.indexOf(self.name) > -1)) {
            console.log("new profile");
            self.profile = new MusicProfile(self.name,self.age);
            self.profiles.push(self.profile);
            self.names.push(self.name);
        }
        self.profile = getProfile(self.name);
        self.profile.addSong(self.playList,self.selectedType);
    };

    function getProfile (name){
        console.log(self.profiles);
        for(var i=0;i<self.profiles.length;i++){
            if(self.profiles[i].name == name) {
                return self.profiles[i];
            }
        }
    }
    self.reset = function(){
        self.name = null;
        self.age = null;
        self.playList = [];
        self.selectedGenre = self.genre.Pop;
        self.selectedType = 'clean';
    };
});

app.controller('UserController', function () {
    var self = this;
    self.mode='display';

    self.user = {
        first: 'Xin',
        last: 'Wang',
        email: 'xin.wang@cmegroup.com'
    };

    self.user2 = {};
    angular.copy(self.user,self.user2);

    self.submit=function(){
        angular.copy(self.user2,self.user);
        self.mode = 'display';
    };

    self.cancel=function(){
        self.mode='display';
    };
});

app.controller('UIThemePickerController', function () {
    var self = this;
    self.userObjectSelection=0;
    self.idx = 0;
    self.text = '';
    self.choices = ['NONE','SUCCESS','SKY','WARNING','DANGER','NIGHT'];
    self.bodyColor = ['white','lightgreen','lightblue','lightorange','blink','lightgray'];
    self.div1Color = ['gray','darkgree ','darkblue','brown','darkred','black'];
    self.div2Color = ['lightgray','green','blue','orange','red','midnightblue'];
    self.fontColor = ['black','white','white','black','white','white'];
    self.categories = {
        Personal:['tv'],
        Work:['meeting'],
        Trip:['ny','boston']
    };
    self.showFolder = function(){
        if(self.collaps) return 'glyphicon glyphicon-folder-close';
        else return 'glyphicon glyphicon-folder-open';
    };

    self.addContent = function(idx,content){
        if(idx==0)
            self.categories.Personal.push(content);
        if(idx==1)
            self.categories.Trip.push(content);
        if(idx==2)
            self.categories.Work.push(content);
        self.text = '';
    };
});

app.controller('SimonController', function ($scope,$timeout) {
    var self = this;
    self.colors = {
        blue: 'blue',
        red: 'red',
        orange: 'orange',
        green: 'green',
        blink: 'black'
    };
    self.red = self.colors.red;
    self.blue = self.colors.blue;
    self.green = self.colors.green;
    self.orange = self.colors.orange;

    self.myColors = [];
    self.simonColors = [];
    self.mode = 'Over';
    self.score = 0;
    self.highScore = 0;
    self.around = 0;
    self.color = null;

    $scope.$watch ("simonCtrl.around", function(newval,oldval){
        //console.log("new " + newval + " old " + oldval);
        if(newval != oldval) {
            check();
        }
    }, true);

    function check(){
        //console.log("checking my colors");
        //console.log(self.myColors);
        for(var i=0;i<self.myColors.length;i++){
            //console.log("Your color: " + self.myColors[i] + " and Simon's color: " + self.simonColors[i]);
            if(self.simonColors[i] == self.myColors[i]){
                console.log("correct");
            }
            else {
                console.log("incorrect");
                gameOver();
            }
        }
        if(self.message != 'Game Over'){
            if(self.myColors.length == self.simonColors.length) {
                scored();
                self.simonTurn();
            }
        }
    }
    self.start = function() {
        self.score = 0;
        self.myColors = [];
        self.simonColors = [];
        self.message = '';
        self.mode = 'Simon';
        nextMove();
    };

    self.simonTurn = function(){
        self.mode = 'Simon';
        console.log("Simon's turn");
        //console.log(self.simonColors);
        self.message = 'Watch Me';
        //$timeout(oldMove,1000);
        oldMove();
        $timeout(nextMove,1000+ self.simonColors.length * 1000);
    };

    function oldMove(){
        var i = 0;
        function myLoop(){
            self.color = self.simonColors[i];
            $timeout(function(){
                console.log('simon clicked ' + self.color);
                $scope.$apply(function(){
                    self.class = '';
                    if(self.color == 'red'){
                        self.class = 'red';
                    }if(self.color == 'blue'){
                        self.class = 'blue';
                    }if(self.color == 'orange'){
                        self.class = 'orange';
                    }if(self.color == 'green'){
                        self.class = 'green';
                    }
                });
                i++;
                if(i<self.simonColors.length){
                    myLoop();
                }
            },1000);
        }
        myLoop();
    }

    function nextMove(){

        var randomNumber = Math.floor((Math.random() * 4) + 1);
        if (randomNumber == 1) {
            simonClick('blue');
            self.simonColors.push('blue');
        } else if (randomNumber == 2) {
            simonClick('orange');
            self.simonColors.push('orange');
        }
        else if (randomNumber == 3) {
            simonClick('red');
            self.simonColors.push('red');
        }
        else if (randomNumber == 4) {
            simonClick('green');
            self.simonColors.push('green');
        }
        resetClass();
        self.yourTurn();
    }

    function simonClick (color){
        setTimeout(function(){
            console.log('simon clicked ' + color);
            $scope.$apply(function(){
                self.class = '';
                if(color == 'red'){
                    self.class = 'red';
                }if(color == 'blue'){
                    self.class = 'blue';
                }if(color == 'orange'){
                    self.class = 'orange';
                }if(color == 'green'){
                    self.class = 'green';
                }
            })
        }, 1000);

    }

    self.yourTurn = function(){
        console.log(self.simonColors);
        $timeout(function(){
            self.mode = 'Your';
            self.message = 'Your Turn';
            console.log("Your turn" + self.around );
        },1000 + self.simonColors.length * 1000);
    };

    self.youClicked = function (color){
        self.class = '';
        if(color=='red'){
            console.log("You clicked red");
            self.class = 'red';
            self.myColors.push(self.red);
            self.around ++;
        }
        if(color=='orange'){
            console.log("You clicked orange");
            self.class = 'orange';
            self.myColors.push(self.orange);
            self.around ++;
        }
        if(color=='blue'){
            console.log("You clicked blue");
            self.class = 'blue';
            self.myColors.push(self.blue);
            self.around ++;

        }
        if(color=='green'){
            console.log("You clicked green");
            self.class = 'green';
            self.myColors.push(self.green);
            self.around ++;
        }
        $timeout(resetClass,1000);

    };

    function resetClass(){
        setTimeout(function(){
            console.log('reset class');
            $scope.$apply(function(){
                self.class = '';
            })
        }, 1500);
    }

    function scored(){
        if(self.around >= self.simonColors.length){
            self.score ++;
            self.myColors = [];
            console.log("scored, reset my colors");
            self.message = "great!";
        }
    }

    function gameOver(){
        self.myColors = [];
        self.simonColors = [];
        self.mode = 'Over';
        self.score = 0;
        self.around = 0;
        self.message = 'Game Over';
        resetClass();
    }

});

