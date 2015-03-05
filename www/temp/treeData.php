<?php
	$array = array(
		array(
			'id'  => 1,
			'pid' => 0,
			'name' =>"选项 1",
			'open' => false
		),
		array(
			'id'  => 11,
			'pid' => 1,
			'name' =>"选项 11",
			'open' => false
		),
		array(
			'id'  => 12,
			'pid' => 1,
			'name' =>"选项 12",
			'open' => false
		),
		array(
			'id'  => 121,
			'pid' => 12,
			'name' =>"选项 121",
			'open' => true
		),
		array(
			'id'  => 122,
			'pid' => 12,
			'name' =>"选项 122",
			'open' => true
		),
		array(
			'id'  => 13,
			'pid' => 1,
			'name' =>"选项 13",
			'open' => true
		),
		array(
			'id'  => 131,
			'pid' => 13,
			'name' =>"选项 131",
			'open' => true
		),
		array(
			'id'  => 132,
			'pid' => 13,
			'name' =>"选项 132",
			'open' => true
		),
		array(
			'id'  => 1321,
			'pid' => 132,
			'name' =>"选项 1321",
			'open' => true
		),
		array(
			'id'  => 13211,
			'pid' => 1321,
			'name' =>"选项 13211",
			'open' => true
		),
		array(
			'id'  => 132111,
			'pid' => 13211,
			'name' =>"选项 132111",
			'open' => true
		),
		array(
			'id'  => 132112,
			'pid' => 13211,
			'name' =>"选项 132112",
			'open' => true
		),
		array(
			'id'  => 132113,
			'pid' => 13211,
			'name' =>"选项 132113",
			'open' => true
		),
		array(
			'id'  => 142,
			'pid' => 13,
			'name' =>"选项 142",
			'open' => true
		),
		array(
			'id'  => 2,
			'pid' => 0,
			'name' =>"选项 2",
			'open' => true
		),
		array(
			'id'  => 21,
			'pid' => 2,
			'name' =>"选项 21",
			'open' => true
		),
		array(
			'id'  => 211,
			'pid' => 21,
			'name' =>"选项 211",
			'open' => true
		),
		array(
			'id'  => 3,
			'pid' => 0,
			'name' =>"选项 3",
			'isParent' => true
		)
	);
	
	echo json_encode($array);
?>