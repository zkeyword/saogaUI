<?php
	$array = array(
		array(
			'id'  => 1,
			'pId' => 0,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 2,
			'pId' => 0,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 3,
			'pId' => 1,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 4,
			'pId' => 3,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 5,
			'pId' => 4,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 6,
			'pId' => 2,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 7,
			'pId' => 2,
			'name' =>"随意勾选 1",
			'open' => true
		),
		array(
			'id'  => 8,
			'pId' => 0,
			'name' =>"随意勾选 1",
			'open' => true
		),
	);
	
	$array2 = array(
		array(
			'id'  => 1,
			'pId' => 0,
			'name' =>"随意勾选 21",
			'open' => true
		),
		array(
			'id'  => 2,
			'pId' => 0,
			'name' =>"随意勾选 22",
			'open' => true
		),
		array(
			'id'  => 3,
			'pId' => 1,
			'name' =>"随意勾选 23",
			'open' => true
		),
		array(
			'id'  => 4,
			'pId' => 3,
			'name' =>"随意勾选 24",
			'open' => true
		),
		array(
			'id'  => 5,
			'pId' => 4,
			'name' =>"随意勾选 25",
			'open' => true
		),
		array(
			'id'  => 6,
			'pId' => 2,
			'name' =>"随意勾选 26",
			'open' => true
		),
		array(
			'id'  => 7,
			'pId' => 2,
			'name' =>"随意勾选 27",
			'open' => true
		),
		array(
			'id'  => 8,
			'pId' => 0,
			'name' =>"随意勾选 28",
			'open' => true
		),
	);
	
	$index = $_POST['index'];
	
	if( $index == 1 ){
		echo json_encode($array);
	}else{
		echo json_encode($array2);
	}
?>