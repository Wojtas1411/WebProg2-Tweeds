client = require("../datasources/db");

exports.get_all_courses = function(callback){
    client.query(
        "SELECT * FROM courses",
        function(err, results, fields){
            if(err){
                console.log("Failed to get all courses");
                console.log(err);
                callback(false);
            } else {
                console.log("Courses fetched");
                callback(results)
            }

        }
    );
}

exports.get_course_by_id = function(id, callback){
    client.execute(
        "SELECT * FROM courses WHERE id = ?",
        [id],
        function(err, results){
            if(err){
                console.log("Failed to get course with id ${id}");
                console.log(err);
                callback(false);
            } else {
                console.log("Found course with id ${id}");
                callback(results[0]);
            }
        }

    );
}

exports.create_course = function(course, callback){
    client.execute(
        "INSERT INTO courses (name, program, lecturer) VALUES(?,?,?)",
        [course.name, course.program, course.lecturer],
        function(err, results){
            if(err) {
                console.log("Failed to create course");
                console.log(err);
                callback(false);
            } else {
                console.log("Course created succesfully");
                callback(true);
            }
        }
    );

}

exports.update_course = function(course, callback){
    client.execute(
        "UPDATE courses SET name = ? program = ? lecturer = ? WHERE id = ?",
        [course.name, course.program, course.lecturer, course.id],
        function(err, results){
            if(err) {
                console.log("Failed to update course");
                console.log(err);
                callback(false);
            } else {
                console.log("Course updated succesfully");
                callback(true);
            }
        }
    );

}

exports.delete_course = function(course, callback){
    client.execute(
        "DELETE FROM courses WHERE id = ?",
        [course.id],
        function(err, results){
            if(err) {
                console.log("Failed to delete course");
                console.log(err);
                callback(false);
            } else {
                console.log("Course deleted succesfully");
                callback(true);
            }
        }
    );
}

exports.get_all_courses_with_registers = function(user_id, callback){
    client.execute(
        `SELECT c.id as id, c.name, c.program, c.lecturer ,COALESCE(us.subscribes,0) FROM courses c
        LEFT OUTER JOIN (SELECT r.course_id, 1 as subscribes
        FROM registers r WHERE user_id=?) us ON c.id=us.course_id`,
        [user_id],
        function(err, results){
            if(err){
                console.log("Error fetching courses with registers");
                console.log("error");
                callback(false);
            } else {
                console.log("Courses with registers fetched")
                callback(results);
            }
        }
    )

}