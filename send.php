<?php
// Setup this mail address
$sender_mail="sender@email.com";

$t_from = $_POST["transport_from"];
$t_to = $_POST["transport_to"];
if($_POST["transport_airplane"] === "airbus")
{
	$t_ap = "Airbus 380";
	$to = "airbus@lemonmind.com";
}
else
{
	$t_ap = "Boeing 747";
	$to = "boeing@lemonmind.com";
	
}
$t_date = $_POST["transport_date"];
$loads = array();
for ($x = 1; isset($_POST["load_name".$x]); $x++) 
{
	if($_POST["load_type".$x] === "normal")
		$type = "ładunek zwykły";
	else
		$type = "ładunek niebezpieczny";
	array_push($loads,array($_POST["load_name".$x], $_POST["load_weight".$x], $type));
} 
$subject = "Nowe żądanie transportu";

$message = "
<html>
<head>
<title>Transport</title>
</head>
<body>

<p>Nowy transport</p>
Od: ".$t_from."<br>
Do: ".$t_to."<br>
Samolot: ".$t_ap."<br>
Data: ".$t_date."<table>
<tr>
<th>Nazwa</th>
<th>Waga</th>
<th>Typ</th>
</tr>";
for ($x = 0; $x < count($loads); $x++)
{
	$message .= "<tr>";
	$curr_load = $loads[$x];
	for ($y = 0; $y < 3; $y++)
	{
		$message .= "<td>".$curr_load[$y]."</td>";
	}
	$message .= "</tr>";
}
$message .= "</table>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'.$sender_mail.'>' . "\r\n";
?>

<!DOCTYPE html>
<html lang="pl">

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="form.css" rel="stylesheet" type="text/css">
	<title>Wynik</title>
	<meta charset="utf-8" />
</head>

<body>
	<div id="container">
		<?php
			mail($to,$subject,$message,$headers);
			echo "Wysłano mail o treści: \r\n".$message;
		?>
	</div>
</body>
</html>