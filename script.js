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