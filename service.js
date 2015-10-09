angular.module('AngularJS102')

.service('Calculator', function () {
    var self = this;
    var grade = 0;
    self.average = function(scores){
        var count = 0;
        for (var i=0; i < scores.length; i++) {
            count += parseInt(scores[i]);
        }
        grade = count/scores.length;
        return grade;
    };

    self.getGrade =function(){
        if(grade > 90) return 'A';
        if(grade > 80) return 'B';
        if(grade > 70) return 'C';
        if(grade > 60) return 'D';
        return 'F';
    };

    self.isPassing = function(){
        return grade > 60;
    }
})

.factory('Student', function(){
        function Student(name){
            this.name = name;
            this.assignments = [];
            this.scores = [];
        }

        Student.prototype.addAssignment = function(assignment){
            this.assignments.push(assignment);
            this.scores.push(assignment.score);
        };

        return Student;
});