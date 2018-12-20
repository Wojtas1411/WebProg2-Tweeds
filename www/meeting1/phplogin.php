<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>PHP Login Example</title>
<style>
 input { background-color: yellow; }
</style>
</head>
<body>
<?php
  $loginDone = false;

  if (isset($_POST["account"]))
    { 
       if ($_POST["password"] == "vmueller")
          {
             $loginDone = true;
             echo "<h1>Welcome, User '" . $_POST["account"] . "'</h1>";
          }     
    }
?>

<?php 

  if (! $loginDone)
   {
?>

   <h1>Login page</h1>
   <form action="<?php echo $SCRIPT_NAME ?>" method="post">
   <table> <tr>
   <td>Login name:</td>
   <td><input type="text" name="account" size="20" maxlength="20"></td>
   </tr><tr>
   <td>Password:</td>
   <td><input type="password" name="password" size="20"></td>
   </tr></table>
   <button name="submit" type="submit">Login</button></form>
   
<?php } ?>

</body>
</html>