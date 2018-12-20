<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>DB Access with PDO</title>
    </head>
    <body>
        <?php
        $database   = "meeting2";
        $user = $password = "webprog";
        $host       = "mysql";
        $connection = new PDO("mysql:host={$host};dbname={$database};charset=utf8", $user, $password);
        $query      = $connection->query("SELECT * FROM `Accounts`");
        $result     = $query->fetchAll();
        
        print ("<h1>Found the following account information</h1>");
	print("<table border='1' cellpadding='10' style='padding:1mm'>");
        print("<tr><th>Account name</th><th>Password</th><th>Email</th></tr>");
        foreach ($result as $row) {
          print("<tr><td>" . $row["account"] . " </td><td>" 
                  . $row["pwd"] . "</td><td>" . $row["email"] . "</td></tr>");
                }
        print("</table>");
        ?>
    </body>
</html>
