<?php
	$array = array(
		array(
			'id'  => 1,
			'pId' => 0,
			'name' =>"选项 1",
			'open' => true
		),
		array(
			'id'  => 11,
			'pId' => 1,
			'name' =>"选项 11",
		),
		array(
			'id'  => 12,
			'pId' => 1,
			'name' =>"选项 12",
		),
		array(
			'id'  => 121,
			'pId' => 12,
			'name' =>"选项 121",
		),
		array(
			'id'  => 122,
			'pId' => 12,
			'name' =>"选项 122",
		),
		array(
			'id'  => 13,
			'pId' => 1,
			'name' =>"选项 13",
		),
		array(
			'id'  => 131,
			'pId' => 13,
			'name' =>"选项 131",
		),
		array(
			'id'  => 132,
			'pId' => 13,
			'name' =>"选项 132",
		),
		array(
			'id'  => 1321,
			'pId' => 132,
			'name' =>"选项 1321",
		),
		array(
			'id'  => 13211,
			'pId' => 1321,
			'name' =>"选项 13211",
		),
		array(
			'id'  => 132111,
			'pId' => 13211,
			'name' =>"选项 132111",
		),
		array(
			'id'  => 132112,
			'pId' => 13211,
			'name' =>"选项 132112",
		),
		array(
			'id'  => 132113,
			'pId' => 13211,
			'name' =>"选项 132113",
		),
		array(
			'id'  => 142,
			'pId' => 13,
			'name' =>"选项 142",
		),
		array(
			'id'  => 2,
			'pId' => 0,
			'name' =>"选项 2",
		),
		array(
			'id'  => 21,
			'pId' => 2,
			'name' =>"选项 21",
		),
		array(
			'id'  => 211,
			'pId' => 21,
			'name' =>"选项 211",
		),
		array(
			'id'  => 3,
			'pId' => 0,
			'name' =>"选项 3",
			'isParent' => true
		)
	);
	
	echo json_encode($array);
?>