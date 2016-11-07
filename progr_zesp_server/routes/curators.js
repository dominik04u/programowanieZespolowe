module.exports = function(app, database) {

        app.post('/curators', function(req, res) {
            var data = req.body.data;
            console.log("curators");
            console.log(JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            database.connectDB()
                .then (function (result) {
                    database.select("SELECT * FROM users AS u INNER JOIN rooms AS r ON u.ID_user=r.ID_user ")
                        .then(function (result) {
                            if (result.length > 0) { 
							console.log(result);
							res.send({ curatorData: result });
                            } 
                        }, function (err) {
                            console.log("select error !!!! " + err); // wyst�pi� b��d mySQL'a
                        });
                    database.setConnectionInfo();
                    // database.endConnection();
                    }, function (err) { 
                        res.send({ end: true });
                        database.setConnectionInfo();
                        console.log("err " + err);
                    }

            );
        });
    };
