<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Tasks</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<link rel="stylesheet" href="{{ asset('dist/bundle.css') }}">
</head>
<body>
<div class="application"></div>
<script src="{{ asset('dist/bundle.js') }}"></script>
<script type="text/javascript">
	$(document).ready(function() {
		Tasks.start();
	});
</script>
</body>
</html>