<?php
require_once './css-crush/CssCrush.php';
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Adm'in.2</title>
	
	<meta name="viewport" content="initial-scale=1, user-scalable=no">
	<?php echo csscrush_tag('css/adm-in-2.css'); ?>
</head>
<body>
	<div id="topbar">
		<a href="./" id="logo"><span>Adm'in.2</span></a>

		<nav id="quick-links">
			<a href="#0"><span>Mon profil</span></a>
			<a href="#0"><span>Déconnexion</span></a>
		</nav>
	</div>
	<nav id="sidebar" hidden="true" aria-hidden="true">
		<header id="sidebar-header" role="button" tabindex="0"><h1>Menu</h1></header>

		<ul id="sidebar-content">
			<li class="widget widget-search">
				<h2 class="widget-title">Recherche</h2>
				<form action="#0" method="get" class="widget-content show" id="sidebar-search-form">
					<input type="search" name="q" value="post(author_id=(user(pseudo=viki53):id))" placeholder="Rechercher">
				</form>
			</li>
			<li class="menu">
				<h2 class="menu-title"><a href="#0">Articles</a></h2>
				<ul class="menu-content">
					<li class="submenu">
						<a href="#0">Liste <span class="badge badge-warning">1</span></a>
					</li>
					<li class="submenu">
						<a href="#0">Ajouter</a>
					</li>
					<li class="submenu">
						<a href="#0">Catégories <small class="submenu-description">Une description par ici</small></a>
					</li>
				</ul>
			</li>
			<li class="menu">
				<h2 class="menu-title"><a href="#0">Médias <span class="badge">2</span></a></h2>
				<ul class="menu-content">
					<li class="submenu">
						<a href="#0">Liste <span class="badge badge-info">2</span></a>
					</li>
					<li class="submenu">
						<a href="#0">Ajouter</a>
					</li>
					<li class="submenu">
						<a href="#0">Catégories</a>
					</li>
				</ul>
			</li>
			<li class="menu">
				<h2 class="menu-title"><a href="#0">Utilisateurs</a></h2>
				<ul class="menu-content">
					<li class="submenu">
						<a href="#0">Liste <span class="badge badge-success">5</span></a>
					</li>
					<li class="submenu">
						<a href="#0">Membres premium</a>
					</li>
					<li class="submenu">
						<a href="#0">Ajouter</a>
					</li>
				</ul>
			</li>
			<li class="menu">
				<h2 class="menu-title"><a href="#0">Défis</a></h2>
				<ul class="menu-content">
					<li class="submenu">
						<a href="#0">Liste</a>
					</li>
					<li class="submenu">
						<a href="#0">Ajouter</a>
					</li>
				</ul>
			</li>
			<li class="menu">
				<h2 class="menu-title"><a href="#0">Paramètres</a></h2>
				<ul class="menu-content">
					<li class="submenu">
						<a href="#0">API <span class="badge badge-error">2</span></a>
					</li>
					<li class="submenu">
						<a href="#0">Administrateurs</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div id="main">
		<h1>Tableau de bord</h1>
		<div class="row">
			<div class="column-large widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Statistiques</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>En ligne</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Personne</p>
					</div>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-tiny widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Accès rapides</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-big widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Brouillon rapide</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-medium widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Derniers inscrit</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-medium widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Derniers articles</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-tiny widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-medium widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-tiny widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
		</div>
		<div class="row">
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
			<div class="column-small widgets-column">
				<section class="widget">
					<header class="widget-header">
						<h2>Titre</h2>
					</header>
					<div class="widget-content">
						<p class="italic">Pas de contenu</p>
					</div>
				</section>
			</div>
		</div>
		<div id="footer">
			<p>Nom du site — <?php echo date('Y'); ?></p>
		</div>
	</div>
	<script src="js/adm-in-2.js"></script>
</body>
</html>