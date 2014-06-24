<?php
require_once 'css-crush/CssCrush.php';

if(!empty($_GET['q'])) {
	require_once 'css2sql/php/Css2Sql.class.php';

	$selector = Css2Sql::parse_selector(trim($_GET['q']));

	$search_SQL = Css2Sql::selector_to_sql($selector, 'meet_');
}
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Adm'in.2</title>
	
	<meta name="viewport" content="initial-scale=1, user-scalable=no">
	<?php echo csscrush_tag('css/adm-in-2.css'); ?>
</head>
<body>
	<div role="banner" id="topbar">
		<a href="./" id="logo"><span>Adm'in.2</span></a>

		<nav role="navigation" id="quick-links">
			<a href="#0"><span role="tooltip">My profile</span></a>
			<a href="#0"><span role="tooltip">Log out</span></a>
		</nav>
	</div>
	<nav role="navigation" id="sidebar">
		<header id="sidebar-header"><h1>Menu</h1></header>

		<ul role="menu" aria-labelledby="sidebar-header" id="sidebar-content">
			<li class="widget widget-search">
				<h2 class="widget-title">Search</h2>
				<form action="#0" method="get" class="widget-content show" id="sidebar-search-form">
					<input type="search" name="q" value="post[author_id=user[pseudo=viki53]::id]" placeholder="Rechercher" id="sidebar-search-input">
				</form>
			</li>
			<li role="menuitem" class="menu">
				<h2 class="menu-title"><a href="#0">Blog posts</a></h2>
				<ul role="menu" class="menu-content">
					<li role="menuitem" class="submenu">
						<a href="#0">List <span class="badge badge-warning">1</span></a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Write new</a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Categories <small class="submenu-description">A short description here</small></a>
					</li>
				</ul>
			</li>
			<li role="menuitem" class="menu">
				<h2 class="menu-title"><a href="#0">Medias <span class="badge">2</span></a></h2>
				<ul role="menu" class="menu-content">
					<li role="menuitem" class="submenu">
						<a href="#0">List <span class="badge badge-info">2</span></a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Upload</a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Categories</a>
					</li>
				</ul>
			</li>
			<li role="menuitem" class="menu">
				<h2 class="menu-title"><a href="#0">Users</a></h2>
				<ul role="menu" class="menu-content">
					<li role="menuitem" class="submenu">
						<a href="#0">List <span class="badge badge-success">5</span></a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Premium users</a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Add</a>
					</li>
				</ul>
			</li>
			<li role="menuitem" class="menu">
				<h2 class="menu-title"><a href="#0">Games</a></h2>
				<ul role="menu" class="menu-content" hidden="true" aria-hidden="true">
					<li role="menuitem" class="submenu">
						<a href="#0">List</a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Add</a>
					</li>
				</ul>
			</li>
			<li role="menuitem" class="menu">
				<h2 class="menu-title"><a href="#0">Settings</a></h2>
				<ul role="menu" class="menu-content">
					<li role="menuitem" class="submenu">
						<a href="#0">API <span class="badge badge-error">2</span></a>
					</li>
					<li role="menuitem" class="submenu">
						<a href="#0">Administrators</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div role="main" id="main">
		<h1>Dashboard</h1>
		
		<?php
		if(isset($search_SQL)) {
			echo '<pre>'.$search_SQL.'</pre>';
		}
		?>
		<div class="row">
			<div class="column-large widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Statistics</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Online</h2>
					</header>
					<div class="widget-content">
						<ul>
							<li>User #1</li>
							<li>User #2</li>
							<li>User #3</li>
							<li>User #4</li>
							<li>User #5</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-tiny widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Fast links</h2>
					</header>
					<div class="widget-content">
						<ul>
						    <li><a href="#0">User #1</a></li>
						    <li><a href="#0">User #2</a></li>
						    <li><a href="#0">User #3</a></li>
						    <li><a href="#0">User #4</a></li>
						    <li><a href="#0">User #5</a></li>
						</ul>
					</div>
				</section>
			</div>
			<div class="column-big widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Quick draft</h2>
					</header>
					<form action="#demo-widget-form" method="post" class="widget-content">
						<div>
							<label for="demo-form-title" class="full">Title</label>
							<input type="text" name="title" placeholder="A big input" class="input-full input-xl" id="demo-form-title">
						</div>
						<div>
							<label for="demo-form-textarea" class="full">Content</label>
							<textarea name="content" cols="30" rows="10" placeholder="A normal textarea" class="input-full" id="demo-form-textarea"></textarea>
						</div>
						<div>
							<label for="demo-form-select" class="full">Category</label>
							<select name="category_id" class="input-full input-xs" id="demo-form-select"><?php for($i=1; $i<=5; $i++) {echo '<option value="'.$i.'">Category #'.$i.'</option>'; } ?></select>
						</div>
						<div class="text-right">
							<button type="reset" class="button-error">Cancel</button>
							<button type="button" class="button-xl button-success">Save</button>
						</div>
					</form>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-medium widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Latest registrations</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
			<div class="column-medium widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Latest articles</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
		</div>
		<div class="container">
			<h2>This next row is in a container</h2>
			<div class="row">
				<div class="column-tiny widgets-column">
					<section class="widget">
						<header class="widget-header">
							<h2>Custom select</h2>
						</header>
						<div class="widget-content">
							<form action="#0" method="get" accept-charset="utf-8">
								<select class="input-full input-xl custom-select">
									<option value="1">Option #1</option>
									<option value="2">Option #2</option>
									<option value="3">Option #3</option>
									<option value="4">Option #4</option>
									<option value="5">Option #5</option>
								</select>
							</form>
						</div>
					</section>
				</div>
				<div class="column-medium widgets-column">
					<section class="widget">
						<header class="widget-header">
							<h2>Text editor</h2>
						</header>
						<div class="widget-content">
							<p class="italic">No content yet</p>
						</div>
					</section>
				</div>
				<div class="column-tiny widgets-column">
					<section class="widget">
						<header class="widget-header">
							<h2>Modals</h2>
						</header>
						<div class="widget-content">
							<p class="italic">No content yet</p>
						</div>
					</section>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Title</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Title</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Title</h2>
					</header>
					<div class="widget-content">
						<p class="italic">No content yet</p>
					</div>
				</section>
			</div>
		</div>
		<div id="footer">
			<p>Your website name — <?php echo date('Y'); ?></p>
			<!-- You may not delete the following phrase if you want to respect the license. Translating is allowed if you keep the meaning intact. -->
			<p id="admin2-copyright">Adm'in.2 interface by <a href="http://www.comin2.com" target="_blank">COM'in.2</a></p>
		</div>
	</div>
	<script src="js/adm-in-2.js"></script>
</body>
</html>