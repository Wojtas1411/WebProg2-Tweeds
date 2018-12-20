<?php session_start(); ?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>Session Example</title>
</head>
<body>

<?php

  if (empty($_SESSION['count'])) 
     $_SESSION['count'] = 1;
  else 
   $_SESSION['count']++;

?>

<p>
Hello visitor, you have seen this page <?php echo $_SESSION['count']; ?> times. </p> 
<p>Current Session ID is <?php echo session_id(); ?> </p>

</body>
</html>