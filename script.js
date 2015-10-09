// create the module and name it scotchApp
var app = angular.module('AngularJS102', ['ngRoute']);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
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

        // route for the contact page
        .when('/HomeworkAssignments', {
            templateUrl : 'HomeworkAssignments/UIThemePicker-view.html',
            controller  : 'UIThemePickerController'
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

    self.addTask =function (task, score){
        var assignment = {
            task:task,
            score:score
        };
        if(!self.student)
            self.student = new Student();
        self.student.addAssignment(assignment);
        //self.assignments.push(assignment);
        self.avg = self.getAverage();
        self.grd = Calculator.getGrade();
        self.passing = Calculator.isPassing();
    };

    self.getAverage=function(){
        if(!self.student.assignments.length>0){
            return undefined;
        }
        var a;
        a = Calculator.average(self.student.scores);
        return a;
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
    self.bodyColor = ['white','lightgreen','lightblue','lightyellow','pink','lightgray'];
    self.div1Color = ['gray','darkgree ','darkblue','brown','darkred','black'];
    self.div2Color = ['lightgray','green','blue','yellow','red','midnightblue'];
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